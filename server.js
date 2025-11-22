import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { tokenDecoder } from "./middlewares/tokenMiddlware.js";
import Product from "./models/product.schema.js";
import Order from "./models/order.schema.js";
import upload from "./middlewares/mutlerConfig.js";

const app = express();
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173", // Allow only a specific origin
  credentials: true, // Enable cookies and credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// Expose uploads folder
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// try $unwind with empty products array
app.post("/api/v1/upload", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file, "req.file", req.file.path, "req.file.path");
    return res.send(true);
  } catch (error) {}
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

app.get("/matching-grouping", async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { price: { $gt: 100 } } },
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.send(products); //[{_id : "clothing"},{_id : "footwear"}]
  } catch (error) {}
});

// try $unwind with empty products array
app.get("/unwinding", async (req, res) => {
  try {
    // const products = await Order.find({}).select("user products")
    const products = await Order.aggregate([
      { $unwind: "$products" }, // []
      { $project: { user: 1, products: 1, price: 1, _id: 0 } },
    ]);
    res.send(products); //[{_id : "clothing"},{_id : "footwear"}]
  } catch (error) {}
});
// {
//   user : "ajkbnawbdyawt67889",
//   products : ["1productId","2productId","3productId"],
//   price : 234543
// }
// {
//   user : "ajkbnawbdyawt67889",
//   products : "1productId",
//   price : 234543
// }
// {
//   user : "ajkbnawbdyawt67889",
//   products : "2productId",
//   price : 234543
// }

// {
//   user : "ajkbnawbdyawt67889",
//   products : "3productId",
//   price : 234543
// }

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB Connection Failed!"));

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
