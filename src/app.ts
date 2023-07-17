import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

import DBConfig from "./db/config";
import Routes from "./routes/Routes";

config();

const app = express();
const PORT = process.env.PORT || 8001;
const prefix = "/api";

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api/test", (req, res) => {
  return res.json({ message: "Get API successfully" });
});

app.use(prefix, Routes.auth);

DBConfig(() => {
  app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT} 🚀🚀🚀`)
  );
});
