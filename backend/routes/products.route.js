import { Router } from "express";
import multer from "multer";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const productRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/create", authUser, upload.single("thumbnail"), createProduct);
productRouter.delete("/:id", authUser, deleteProduct);
productRouter.put("/update/:id", authUser, upload.single("thumbnail"), updateProduct);

export default productRouter;
