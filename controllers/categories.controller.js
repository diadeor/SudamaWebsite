import Category from "../models/categories.model.js";
import path from "path";
import { rename } from "fs";
import mongoose from "mongoose";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({}, "name");
    res.json({
      success: true,
      categories,
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
      category,
    });
  } catch (error) {
    next(error);
  }
};
