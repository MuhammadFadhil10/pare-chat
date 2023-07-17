import User from "../models/User";

export default class AuthRepository {
  static async signUp(data: unknown) {
    return await User.create(data);
  }
}
