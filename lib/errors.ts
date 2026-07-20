const sanitizeError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message.replace(
      /(?:\/[^\s:]+){2,}/g,
      "[redacted]"
    );
  }
  return "An unknown error occurred";
};

export const logError = (context: string, error: unknown): void => {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]`, error);
  }
};

export const getSafeErrorMessage = (error: unknown): string => {
  return sanitizeError(error);
};
