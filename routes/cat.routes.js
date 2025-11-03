import { Router } from "express";
import multer from "multer";

import {
  getCategories,
  updateCategory,
  createCategory,
} from "../controllers/categories.controller.js";

const catRouter = Router();

const storage = multer.diskStorage({
  destination: "public/categories/",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

catRouter.get("/", getCategories);
catRouter.post("/create", upload.single("thumbnail"), createCategory);
catRouter.put("/update/:id", upload.single("thumbnail"), updateCategory);

export default catRouter;
