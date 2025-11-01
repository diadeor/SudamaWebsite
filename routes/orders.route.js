import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  getUserOrders,
} from "../controllers/orders.controller.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:tx", getOrder);
orderRouter.get("/user", getUserOrders);
orderRouter.post("/create", createOrder);
orderRouter.post("/update/:tx", updateOrder);

export default orderRouter;
