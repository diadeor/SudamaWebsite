import Category from "../models/categories.model.js";
import path from "path";
import { rename } from "fs";
import mongoose from "mongoose";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}, "-__v");
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id, "-__v");
    res.json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const thumbnail = req.file;

    const cat = await Category.findById(id);
    if (!cat) throw new Error("Invalid id");

    const catByName = await Category.findOne({ name });
    if (catByName) {
      if (catByName._id !== id) {
        throw new Error("Category already exists");
      }
      if (catByName.name == name && catByName.thumbnail == thumbnail)
        throw new Error("No changes made");
    }

    const oldPath = req.file.path;
    const newName = `${id}${path.extname(thumbnail.originalname)}`;
    const newPath = `public/categories/${newName}`;

    rename(oldPath, newPath, (err) => {
      if (err) throw new Error("File rename error");
    });

    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: { name, thumbnail: `categories/${newName}` },
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const thumbnail = req.file;

    const generateID = new mongoose.Types.ObjectId();
    const oldPath = req.file.path;
    const newName = `${generateID}${path.extname(thumbnail.originalname)}`;
    const newPath = `public/categories/${newName}`;

    rename(oldPath, newPath, (err) => {
      if (err) throw new Error("File rename error");
    });

    const catExists = await Category.findOne({ name });

    if (catExists) throw new Error("Category already exists");

    const category = await Category.create({
      _id: generateID,
      name,
      thumbnail: `categories/${newName}`,
    });
    res.json({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    next(error);
  }
};
