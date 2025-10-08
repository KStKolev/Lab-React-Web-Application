// Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const isStrongPassword = (value: string): boolean => passwordRegex.test(value);

export default isStrongPassword;
