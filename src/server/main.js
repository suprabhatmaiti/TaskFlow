import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.use("/api/auth", authRoutes);
app.use("/api/task", verifyToken, taskRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
