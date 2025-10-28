// Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Price must be a valid positive number, allowing optional decimal point or comma
const pricePattern = /^(0[.,]\d*|[1-9]\d*[.,]?\d*)$/;

export const isStrongPassword = (value: string): boolean => passwordRegex.test(value);
export const isValidPrice = (value: string): boolean => pricePattern.test(value);
