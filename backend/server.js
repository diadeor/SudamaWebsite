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
import visitRouter from "./routes/visits.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["https://sudama-website.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => res.send("Correct endpoint"));

// Routes
app.use(express.static("./public"));
app.use("/api/stats", authUser, miscRouter);
app.use("/api/users", authUser, userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", authUser, orderRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/carts", authUser, cartRouter);
app.use("/api/categories", catRouter);
app.use("/api/visits", visitRouter);

// Error Middleware
app.use(errorHandle);

// Listening on a port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
  ConnectDB();
});
