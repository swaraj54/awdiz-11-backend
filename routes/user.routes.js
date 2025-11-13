import { Router } from "express";
import {
  AddCart,
  getCartProducts,
  placeOrder,
  getOrders,
} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/add-cart", AddCart);

userRouter.get("/get-cart-products", getCartProducts);

userRouter.get("/place-order", placeOrder);

userRouter.get("/get-orders", getOrders);

export default userRouter;
