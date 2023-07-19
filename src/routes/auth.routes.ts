import express from "express";
import controller from "../controller/Controller";

const router = express.Router();
const { signUp, signIn } = controller.Auth;

// signup
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);

export default router;
