import { Router } from "express";
import multer from "multer";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";

const productRouter = Router();
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/create", upload.single("thumbnail"), createProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/update/:id", upload.single("thumbnail"), updateProduct);

export default productRouter;
