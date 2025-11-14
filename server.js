import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { tokenDecoder } from "./middlewares/tokenMiddlware.js";
import Product from "./models/product.schema.js";

const app = express();
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173", // Allow only a specific origin
  credentials: true, // Enable cookies and credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/api/v1", tokenDecoder, mainRouter);
// app.use("/api/v1",  mainRouter);

app.get("/test", async (req, res) => {
  try {
    const products = await Product.find({
      $nor: [{ price: { $gt: 50000 } }, { quantity: { $nin: [100, 20] } }],
    });

    // const Products = await Product.find({ age: { $eq: 18 } });
    res.send(products);
  } catch (error) {}
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected!"));

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
