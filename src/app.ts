import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import DBConfig from "./db/config";
import Routes from "./routes/Routes";
import Repository from "./repository/Repository";
import { getMessageDto } from "./dto";

config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 8001;
const prefix = "/api";

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api/test", (req, res) => {
  return res.send("Get API successfully");
});

app.use(prefix, Routes.auth);
app.use(prefix, Routes.user);
app.use(prefix, Routes.message);

io.on("connection", (socket) => {
  // join room
  socket.on("join-room", (val) => {
    socket.join(val);
  });

  socket.on("message", async (val, callback) => {
    const payload = val;

    callback(getMessageDto({ ...val, _id: val.id }, val.sender.id));

    await Repository.Message.create(
      payload.sender.id,
      payload.receiver.id,
      payload.message
    );

    const chats = await Repository.Message.getMessage(payload.receiver.id);

    const formattedChats = chats.map((chat) => {
      return getMessageDto(
        {
          ...chat.toObject(),
          sender: chat.senderId,
          receiver: chat.receiverId,
        },
        payload.receiver.id
      );
    });

    socket.nsp
      .to(payload.receiver.id)
      .to(payload.sender.id)
      .emit("message", formattedChats);
  });
});

DBConfig(() => {
  httpServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT} 🚀🚀🚀`)
  );
});
