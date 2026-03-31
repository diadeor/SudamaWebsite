import Blog from "../models/blogs.model.js";
import uploader from "../config/cloudinary.js";

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});

    res.json({ success: true, blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    res.json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    if (role !== "admin") throw new Error("Unauthorized");

    // Log
    console.log("Create blog route", { user: req.user });

    const { title, description } = req.body;
    if (!req.file) throw new Error("No image uploaded");
    const thumbnail = req.file;

    const blogExists = await Blog.findOne({ title });
    if (blogExists) throw new Error("A blog with that title already exists");

    const uploadStream = uploader.upload_stream(
      { folder: "blog_thumbnail" },
      async (error, result) => {
        if (error) {
          console.error(error);
          throw new Error("Cloudinary upload failed.");
        }
        const imageUrl = result.secure_url;
        console.log(imageUrl);

        const blog = await Blog.create({
          title,
          description,
          thumbnail: imageUrl,
        });

        return res.json({
          success: true,
          blog,
        });
      },
    );
    uploadStream.end(thumbnail.buffer);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== "admin") throw new Error("Unauthorized");
    const { title, description } = req.body;
    const thumbnail = req.file;

    // Log
    console.log("Update blog route", { user: req.user });

    const blogExists = await Blog.findOne({ title });
    if (blogExists && blogExists._id !== id)
      throw new Error("A blog with that title already exists");

    const uploadStream = uploader.upload_stream(
      { folder: "blog_thumbnail" },
      async (error, result) => {
        if (error) {
          console.error(error);
          throw new Error("Cloudinary upload failed.");
        }
        const imageUrl = result.secure_url;
        console.log(imageUrl);

        const blog = await Blog.findByIdAndUpdate(
          id,
          { $set: { title, description, thumbnail: imageUrl } },
          { new: true },
        );

        return res.json({
          success: true,
          message: "Blog updated successfully",
          blog,
        });
      },
    );
    uploadStream.end(thumbnail.buffer);
  } catch (error) {
    next(error);
  }
};
