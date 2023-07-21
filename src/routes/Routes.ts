import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export default class Routes {
  static auth = authRoutes;
  static user = userRoutes;
}
