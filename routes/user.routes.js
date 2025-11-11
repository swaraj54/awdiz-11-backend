import { Router } from "express";
import { AddCart, getCartProducts } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/add-cart", AddCart);

userRouter.get("/get-cart-products", getCartProducts);

export default userRouter;
