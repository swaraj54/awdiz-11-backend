import { Router } from "express";
import { AddProduct } from "../controllers/seller.controllers.js";

const sellerRouter = Router();

sellerRouter.post("/add-product", AddProduct);

export default sellerRouter;
