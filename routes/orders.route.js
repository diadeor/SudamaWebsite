import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.post("/create", authUser, createOrder);

export default orderRouter;
