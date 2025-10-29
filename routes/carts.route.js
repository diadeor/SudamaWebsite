import { Router } from "express";
import { getCarts, addToCart, getCart, updateQuantity } from "../controllers/carts.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.get("/", getCarts);
cartRouter.get("/me", authUser, getCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateQuantity);

export default cartRouter;
