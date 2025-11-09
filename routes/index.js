import { Router } from "express";
import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import sellerRouter from "./seller.routes.js";
import {isRoleSeller} from "../middlewares/isRoleSeller.js";
import userRouter from "./user.routes.js";



const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/seller", isRoleSeller, sellerRouter);

mainRouter.use("/products", productRouter);

mainRouter.use("/users", userRouter);


export default mainRouter;
