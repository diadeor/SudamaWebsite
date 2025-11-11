import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  signIn,
  signUp,
  signOut,
  googleLogin,
  changePass,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", signUp);

authRouter.post("/login", signIn);

authRouter.post("/google", googleLogin);

authRouter.post("/pass", authUser, changePass);

authRouter.get("/logout", signOut);

export default authRouter;
