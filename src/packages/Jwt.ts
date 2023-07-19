import { sign } from "jsonwebtoken";

export const createToken = (username: string) => {
  try {
    const token = sign({ username }, "parechatsecretjwt", {
      algorithm: "HS512",
      expiresIn: "1d",
    });

    return token;
  } catch (err: any) {
    const error = err;

    error.status = 500;

    throw new Error(error.message);
  }
};
