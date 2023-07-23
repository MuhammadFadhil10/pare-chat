import express from "express";
import controller from "../controller/Controller";

const router = express.Router();
const { create, getMessages, wipeChats } = controller.Message;

router.post("/message", create);
router.get("/message/:userId", getMessages);
router.delete("/message", wipeChats);

export default router;
