import AuthController from "./Auth.controller";
import MessageController from "./Message.controller";
import UserController from "./User.controller";

export default class controller {
  static Auth = AuthController;
  static User = UserController;
  static Message = MessageController;
}
