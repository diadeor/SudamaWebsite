import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", signUp);

authRouter.post("/login", signIn);

authRouter.get("/logout", signOut);

export default authRouter;
