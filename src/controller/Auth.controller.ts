import { Request, Response } from "express";
import { hash } from "bcrypt";
import Repository from "../repository/Repository";

export default class AuthController {
  static async signUp(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const hashedPassword = await hash(password, 12);

      await Repository.Auth.signUp({ username, password: hashedPassword });

      return res
        .status(200)
        .json({ data: null, message: "Success create Account!" });
    } catch (error: any) {
      console.log("error signup: ", error.message);

      return res.status(400).json({ message: "email already exist!" });
    }
  }
}
