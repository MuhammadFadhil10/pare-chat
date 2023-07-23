import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import messageRoutes from "./message.routes";

export default class Routes {
  static auth = authRoutes;
  static user = userRoutes;
  static message = messageRoutes;
}
