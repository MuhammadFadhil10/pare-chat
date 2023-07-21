import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import DBConfig from "./db/config";
import Routes from "./routes/Routes";

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
  return res.json({ message: "Get API successfully" });
});

app.use(prefix, Routes.auth);
app.use(prefix, Routes.user);

io.on("connection", (socket) => {
  socket.on("message", (val, callback) => {
    console.log("message: ", val);

    callback(val);

    io.sockets.emit("message", val);
  });
});

DBConfig(() => {
  httpServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT} 🚀🚀🚀`)
  );
});
