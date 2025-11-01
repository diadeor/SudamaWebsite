import express from "express";
import multer from "multer";
import path from "path";

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
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/blogs", orderRouter);
app.use("/api/v1/carts", cartRouter);

// Error Middleware
app.use(errorHandle);

// Multer
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log(ext);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const image = req.file;

  res.json({
    message: "Received",
    textData: { title, description },
    fileData: image,
  });
});

// Listening on a port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
  ConnectDB();
});
