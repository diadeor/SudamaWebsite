import { Router } from "express";
import { signIn, signUp, signOut, googleLogin } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", signUp);

authRouter.post("/login", signIn);

authRouter.post("/google", googleLogin);

authRouter.get("/logout", signOut);

export default authRouter;
