import bcrypt from "bcryptjs";

/**
 * Hashes a plain password using bcrypt.
 * @param password - The plain text password.
 * @returns Promise<string> - The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns Promise<boolean> - True if passwords match, otherwise false.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
