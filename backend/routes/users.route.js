import { Router } from "express";
import { getUser, getUsers, updateUser } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/me", getUser);

userRouter.put("/update/:id", updateUser);
export default userRouter;
