import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/api/v1", mainRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected!"));

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
