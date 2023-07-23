import Models from "../models/Models";

const MessageModel = Models.Message;

export default class MessageRepository {
  static async create(senderId: string, receiverId: string, message: string) {
    return await MessageModel.create({ senderId, receiverId, message });
  }

  static async getMessage(userId: string) {
    return await MessageModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("senderId")
      .populate("receiverId");
  }

  static async wipeChats() {
    return await MessageModel.deleteMany();
  }
}
