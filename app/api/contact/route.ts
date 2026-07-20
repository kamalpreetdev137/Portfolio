import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email must be at most 254 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be at most 5000 characters"),
});

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== "https://kamalpreet.dev" && origin !== "http://localhost:3000") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.errors[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safeMessage = sanitizeHtml(message);

    const { error } = await resend.emails.send({
      from: "Kamalpreet.dev <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "kamalpreet.dev137@gmail.com",
      replyTo: email,
      subject: `[Portfolio] New message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#3B82F6,#2563EB);padding:30px;text-align:center;">
                      <h1 style="color:white;margin:0;font-size:24px;">New Contact Message</h1>
                      <p style="color:rgba(255,255,255,0.8);margin:10px 0 0 0;font-size:14px;">From your portfolio contact form</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin:0 0 5px 0;">Name</p>
                            <p style="font-size:16px;color:#333;padding:10px;background:#f8f9fa;border-radius:5px;margin:0;">${safeName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin:0 0 5px 0;">Email</p>
                            <p style="font-size:16px;color:#333;padding:10px;background:#f8f9fa;border-radius:5px;margin:0;">${safeEmail}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin:0 0 5px 0;">Message</p>
                            <div style="background:#f8f9fa;padding:15px;border-radius:5px;white-space:pre-wrap;font-size:16px;color:#333;line-height:1.5;">${safeMessage}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="mailto:${safeEmail}" style="display:inline-block;background:#3B82F6;color:white;padding:12px 24px;border-radius:5px;text-decoration:none;font-weight:bold;">Reply to ${safeName}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px;text-align:center;border-top:1px solid #eee;">
                      <p style="color:#999;font-size:12px;margin:0;">This message was sent from kamalpreet.dev contact form</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Email error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
