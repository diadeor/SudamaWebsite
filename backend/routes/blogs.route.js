import { Router } from "express";
import { getBlogs, getBlog, createBlog, updateBlog } from "../controllers/blogs.controller.js";
import multer from "multer";
import authUser from "../middlewares/auth.middleware.js";

const blogRouter = Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.post("/create", authUser, upload.single("thumbnail"), createBlog);
blogRouter.put("/update/:id", authUser, upload.single("thumbnail"), updateBlog);

export default blogRouter;
