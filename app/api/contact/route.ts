import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Kamalpreet.dev <onboarding@resend.dev>",
      to: "kamalpreet.dev137@gmail.com",
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
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
                            <p style="font-size:16px;color:#333;padding:10px;background:#f8f9fa;border-radius:5px;margin:0;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin:0 0 5px 0;">Email</p>
                            <p style="font-size:16px;color:#333;padding:10px;background:#f8f9fa;border-radius:5px;margin:0;">${email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:20px;">
                            <p style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin:0 0 5px 0;">Message</p>
                            <div style="background:#f8f9fa;padding:15px;border-radius:5px;white-space:pre-wrap;font-size:16px;color:#333;line-height:1.5;">${message}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="mailto:${email}" style="display:inline-block;background:#3B82F6;color:white;padding:12px 24px;border-radius:5px;text-decoration:none;font-weight:bold;">Reply to ${name}</a>
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
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
