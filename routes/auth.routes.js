import { Router } from "express";
import { Login, Register } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", Login );

authRouter.post("/register", Register);

export default authRouter;
