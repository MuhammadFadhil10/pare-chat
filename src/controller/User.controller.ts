import { Request, Response } from "express";
import Repository from "../repository/Repository";

const UserRepo = Repository.User;

export default class UserController {
  static async search(req: Request, res: Response) {
    const { query } = req.params;

    try {
      const response = await UserRepo.search(query);

      return res.json({ data: response });
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}
