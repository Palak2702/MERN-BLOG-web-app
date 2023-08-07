import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectdb from "./config/database.js";
import dotenv from "dotenv";
import router from "./routes/blogRoute.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectdb();

//es module to fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/blog", router);
app.use("/api/v1/users", userRouter);
app.use(express.static(path.join(__dirname, "./client/build")));

const PORT = process.env.PORT || 5000;
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
