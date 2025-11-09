import { Router } from "express";
import {
  CreateProduct,
  GetProducts,
  ProductDetails,
} from "../controllers/product.controllers.js";

const productRouter = Router();

productRouter.post("/create-product", CreateProduct);

productRouter.get("/get-products", GetProducts);

productRouter.get("/product-details/:id", ProductDetails);

export default productRouter;
