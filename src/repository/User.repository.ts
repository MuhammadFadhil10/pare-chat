import { FilterQuery } from "mongoose";
import Models from "../models/Models";

export default class UserRepository {
  static async findOne(
    filter: FilterQuery<{ username: string; password: string }>
  ) {
    return await Models.User.findOne(filter);
  }
}
