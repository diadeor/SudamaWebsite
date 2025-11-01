import { Router } from "express";
import { getBlogs, getBlog, createBlog } from "../controllers/blogs.controller.js";
import multer from "multer";

const blogRouter = Router();
const storage = multer.diskStorage({
  destination: "public/blogs/",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.post("/create", upload.single("thumbnail"), createBlog);

export default blogRouter;
