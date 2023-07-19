import AuthRepository from "./AuthRepository";
import UserRepository from "./User.repository";

export default class Repository {
  static Auth = AuthRepository;
  static User = UserRepository;
}
