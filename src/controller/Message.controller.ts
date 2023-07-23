import { Request, Response } from "express";
import Repository from "../repository/Repository";
import { getMessageDto } from "../dto";

const MessageRepo = Repository.Message;

export default class MessageController {
  static async create(req: Request, res: Response) {
    const { senderId, receiverId, message } = req.body;

    try {
      await MessageRepo.create(senderId, receiverId, message);

      res
        .status(200)
        .json({ data: null, message: "message sent succesfully!" });
    } catch (error: any) {
      res.status(500).json({ data: null, message: error.message });
    }
  }

  static async getMessages(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const rawResponse = await MessageRepo.getMessage(userId);

      const formattedResponse = rawResponse.map((res) => {
        return getMessageDto(
          {
            ...res.toObject(),
            sender: res.senderId,
            receiver: res.receiverId,
          },
          userId
        );
      });

      res.status(200).json({ data: formattedResponse, message: "" });
    } catch (error: any) {
      console.log("error: ", error);
      res.status(500).json({ data: null, message: error.message });
    }
  }

  static async wipeChats(req: Request, res: Response) {
    try {
      await MessageRepo.wipeChats();

      res.status(200).json({ data: null, message: "Messages wiped!" });
    } catch (error: any) {
      console.log("error wipe chat: ", error);
      res.status(500).json({ data: null, message: error.message });
    }
  }
}
