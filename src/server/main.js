import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.use("/api/auth", authRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
