import { Router } from "express";
import {
  getCarts,
  addToCart,
  getCart,
  updateQuantity,
  deleteItem,
} from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/", getCarts);
cartRouter.get("/me", getCart);
cartRouter.post("/add", addToCart);
cartRouter.post("/remove", deleteItem);
cartRouter.post("/update", updateQuantity);

export default cartRouter;
