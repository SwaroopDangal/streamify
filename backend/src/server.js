import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "../src/lib/db.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDB();
});
