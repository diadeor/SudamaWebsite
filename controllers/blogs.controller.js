import Blog from "../models/blogs.model.js";
import path from "path";
import { rename } from "fs";
import mongoose from "mongoose";

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
    const { title, description } = req.body;
    const thumbnail = req.file;

    const blogExists = await Blog.findOne({ title });
    if (blogExists) throw new Error("A blog with that title already exists");

    const generateId = new mongoose.Types.ObjectId();

    const oldPath = req.file.path;
    const newName = `${generateId}${path.extname(thumbnail.originalname)}`;
    const newPath = `public/blogs/${newName}`;
    rename(oldPath, newPath, (err) => {
      if (err) throw new Error("File rename error");
    });

    const blog = await Blog.create({
      _id: generateId,
      title,
      description,
      thumbnail: `blogs/${newName}`,
    });

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const thumbnail = req.file;

    const blogExists = await Blog.findOne({ title });
    if (blogExists && blogExists._id !== id)
      throw new Error("A blog with that title already exists");

    const oldPath = req.file.path;
    const newName = `${id}${path.extname(thumbnail.originalname)}`;
    const newPath = `public/blogs/${newName}`;

    rename(oldPath, newPath, (err) => {
      if (err) throw new Error("File rename error");
    });

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: { title, description, thumbnail: `blogs/${newName}` } },
      { new: true },
    );

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};
