import express from "express";
import controller from "../controller/Controller";

const router = express.Router();
const { signUp } = controller.Auth;

// signup
router.post("/auth/signup", signUp);

export default router;
