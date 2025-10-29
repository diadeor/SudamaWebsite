import { Router } from "express";
import { getUser, getUsers, updateUser } from "../controllers/users.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authUser, getUsers);

userRouter.get("/me", authUser, getUser);

userRouter.put("/update/:id", authUser, updateUser);
export default userRouter;
