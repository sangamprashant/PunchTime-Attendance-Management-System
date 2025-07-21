"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessage = (error) => {
    // Case 1: Standard Error instance
    if (error instanceof Error)
        return error.message;
    // Case 2: Plain string
    if (typeof error === "string")
        return error;
    // Case 3: Object with nested error.message (e.g., error.error.message)
    if (typeof error === "object" &&
        error !== null &&
        "error" in error &&
        typeof error.error === "object" &&
        error.error !== null &&
        "message" in error.error &&
        typeof error.error.message === "string") {
        return error.error.message;
    }
    // Case 4: Object with direct message (e.g., error.message)
    if (typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string") {
        return error.message;
    }
    // Fallback
    return "An unknown error occurred.";
};
exports.default = errorMessage;
