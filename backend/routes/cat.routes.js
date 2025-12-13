import { Router } from "express";
import multer from "multer";
import authUser from "../middlewares/auth.middleware.js";
import {
  getCategories,
  updateCategory,
  createCategory,
  getCategory,
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
catRouter.get("/:id", getCategory);
catRouter.post("/create", authUser, upload.single("thumbnail"), createCategory);
catRouter.put("/update/:id", authUser, upload.single("thumbnail"), updateCategory);

export default catRouter;
