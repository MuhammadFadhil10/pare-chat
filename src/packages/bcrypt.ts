import { compare, hash } from "bcrypt";

export const hashString = async (str: string) => {
  return await hash(str, 12);
};

export const comparePassword = async (
  password: string,
  encrypted: string
): Promise<boolean> => {
  return await compare(password, encrypted);
};
