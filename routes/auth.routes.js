import { Router } from "express";
import { Login, Register, getCurrentUser } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", Login );

authRouter.post("/register", Register);

authRouter.get("/get-current-user", getCurrentUser );

export default authRouter;
