import { Request, Response } from "express";
import Repository from "../repository/Repository";
import { hashString, comparePassword, createToken } from "../packages";

export default class AuthController {
  static async signUp(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const lowerCaseUsername = (username as string).toLowerCase();

      const usernameExistPromise = Repository.User.findOne({
        username: lowerCaseUsername,
      });

      const hashedPasswordPromise = hashString(password);

      const [usernameExist, hashedPassword] = await Promise.all([
        usernameExistPromise,
        hashedPasswordPromise,
      ]);

      if (usernameExist) {
        throw new Error("Username already exist!");
      }

      const createdUser = await Repository.Auth.signUp({
        username: lowerCaseUsername,
        password: hashedPassword,
      });

      const user = {
        username: lowerCaseUsername,
        id: createdUser._id,
      };

      const token = createToken(lowerCaseUsername);

      return res
        .status(200)
        .json({ data: { token, user }, message: "Success create Account!" });
    } catch (error: any) {
      console.log("error signup: ", error.message);

      return res.status(400).json({ message: error.message });
    }
  }

  static async signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const lowerCaseUsername = (username as string).toLowerCase();

      const usernameExist = await Repository.User.findOne({
        username: lowerCaseUsername,
      });

      if (!usernameExist) {
        throw new Error("Username or Password wrong!");
      }

      const passwordMatch = await comparePassword(
        password,
        usernameExist.password
      );

      if (!passwordMatch) {
        throw new Error("Username or Password wrong!");
      }

      // generate token
      const token = createToken(usernameExist.username);

      const { username: payloadUsername, _id: id } = usernameExist;

      return res.status(200).json({
        data: { token, user: { id, username: payloadUsername } },
        message: "Success signin!",
      });
    } catch (error: any) {
      console.log("error signup: ", error.message);

      return res.status(400).json({ message: error.message });
    }
  }
}
