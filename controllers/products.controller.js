import path from "path";
import { rename } from "fs";
import Product from "../models/products.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, category, regularPrice, salePrice, description, stock } = req.body;
    const thumbnail = req.file;
    if ((!name, !category, !salePrice, !stock)) throw new Error("Required fields are not given");
    console.log(req.body);
    const itemExists = await Product.findOne({ name });

    if (itemExists) {
      if (itemExists.name == name && itemExists.category == category)
        throw new Error("Item already exists");
    }

    if (regularPrice && Number(salePrice) > Number(regularPrice)) {
      throw new Error("Sale price cannot be higher than regular price");
    }
    if (stock < 1) throw new Error("Stock is less than 1");

    const genId = new mongoose.Types.ObjectId();
    const oldPath = req.file.path;
    const newName = `${genId}${path.extname(thumbnail.originalname)}`;
    const newPath = `uploads/products/${newName}`;
    rename(oldPath, newPath, (err) => {
      if (err) throw new Error("File rename error");
    });

    const product = await Product.create({
      _id: genId,
      name,
      category,
      regularPrice,
      salePrice,
      stock,
      description,
      thumbnail: newName,
    });

    res.json({
      success: true,
      message: "New Product Created",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, images, thumbnail, category, regularPrice, salePrice, description, stock } =
      req.body;

    if (!name) throw new Error("Name is a required field");
    if (!thumbnail) throw new Error("Product thumbnail is required");
    if (!category) throw new Error("Product category is a required");
    if (!salePrice) throw new Error("Product price is required");
    if (!stock) throw new Error("Stock quantity is required");

    const itemExists = await Product.findOne({ name });

    if (itemExists && itemExists._id != id) {
      if (itemExists.name == name && itemExists.category == category)
        throw new Error("Item already exists");
    }

    if (regularPrice && regularPrice < salePrice)
      throw new Error("Sale price cannot be higher than regular price");

    if (stock < 1) throw new Error("Stock is less than 1");

    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          images,
          thumbnail,
          category,
          regularPrice,
          salePrice,
          stock,
          description,
        },
      },
      { new: true },
    );
    res.json({
      success: true,
      message: "Product Updated",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};
