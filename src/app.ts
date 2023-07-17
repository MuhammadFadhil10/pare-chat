import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { createServer } from "https";
import { Server } from "socket.io";

import DBConfig from "./db/config";
import Routes from "./routes/Routes";

config();

const app = express();
const httpsServer = createServer(app);
const PORT = process.env.PORT || 8001;
const prefix = "/api";

const io = new Server(httpsServer);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api/test", (req, res) => {
  return res.json({ message: "Get API successfully" });
});

app.use(prefix, Routes.auth);

io.on("connection", (socket) => {
  console.log("connect!");
});



DBConfig(() => {
  httpsServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT} 🚀🚀🚀`)
  );
});
