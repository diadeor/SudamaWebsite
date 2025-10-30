import { Router } from "express";
import { createOrder, getOrders, getOrder, updateOrder } from "../controllers/orders.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:tx", getOrder);
orderRouter.post("/create", authUser, createOrder);
orderRouter.post("/update/:tx", authUser, updateOrder);

export default orderRouter;
