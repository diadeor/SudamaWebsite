import express from "express";

import { PORT } from "./config/env.js";
import userRouter from "./routes/users.route.js";
import ConnectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import errorHandle from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/products.route.js";
import miscRouter from "./routes/misc.route.js";
import orderRouter from "./routes/orders.route.js";
import cartRouter from "./routes/carts.route.js";
import authUser from "./middlewares/auth.middleware.js";
import blogRouter from "./routes/blogs.route.js";
import catRouter from "./routes/cat.routes.js";

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// This serves 'public' at the '/public' path

// Routes
app.use(express.static("./public"));
app.use("/api/v1", miscRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", authUser, orderRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/categories", catRouter);

// Error Middleware
app.use(errorHandle);

// Listening on a port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
  ConnectDB();
});
