import { sign, verify, JwtPayload } from "jsonwebtoken";

export const createToken = (username: string) => {
  try {
    const token = sign({ username }, `${process.env.JWT_SECRET}`, {
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

export const verifyToken = (
  token: string,
  callback: (decoded: string | JwtPayload | undefined) => unknown | void
) => {
  try {
    verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
      if (err) throw new Error(err.message);

      callback(decoded);
    });
  } catch (error) {}
};
