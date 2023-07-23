export const getMessageDto = (rawMessage: any, userId: string) => {
  return {
    id: rawMessage._id,
    message: rawMessage.message,
    sender: {
      id: rawMessage.sender?.id ?? rawMessage.sender?._id,
      username: rawMessage.sender.username,
    },
    receiver: {
      id: rawMessage.receiver?.id ?? rawMessage.receiver?._id,
      username: rawMessage.receiver.username,
    },
    person:
      (rawMessage.sender?.id ?? rawMessage.sender?._id) === userId
        ? {
            id: rawMessage.receiver?.id ?? rawMessage.receiver?._id,
            username: rawMessage.receiver.username,
          }
        : {
            id: rawMessage.sender?.id ?? rawMessage.sender?._id,
            username: rawMessage.sender.username,
          },
    createdAt: rawMessage.createdAt,
  };
};
