import { Router } from "express";
import multer from "multer";
import {
  getProducts,
  getProduct,
  createProduct,
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
productRouter.put("/update/:id", updateProduct);

export default productRouter;
