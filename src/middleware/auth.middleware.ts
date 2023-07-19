import { verifyToken } from "../packages";
import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../types";

export default (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      throw new Error("Unauthorized!");
    }

    const token = bearer?.split(" ")[1];

    verifyToken(token, (decoded) => {
      if (!decoded) throw new Error("Authentication failed");

      req.user = decoded;
    });
  } catch (err: any) {
    const error = err;

    error.status = 401;

    throw new Error(error.message);
  }
};
