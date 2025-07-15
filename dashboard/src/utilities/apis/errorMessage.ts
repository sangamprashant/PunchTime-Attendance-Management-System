const errorMessage = (error: unknown): string => {
  // Case 1: Standard Error instance
  if (error instanceof Error) return error.message;

  // Case 2: Plain string
  if (typeof error === "string") return error;

  // Case 3: Object with nested error.message (e.g., error.error.message)
  if (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as any).error === "object" &&
    (error as any).error !== null &&
    "message" in (error as any).error &&
    typeof (error as any).error.message === "string"
  ) {
    return (error as any).error.message;
  }

  // Case 4: Object with direct message (e.g., error.message)
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return (error as any).message;
  }

  // Fallback
  return "An unknown error occurred.";
};

export default errorMessage;
