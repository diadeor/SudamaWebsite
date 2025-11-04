import path from "path";
import { rename } from "fs";
import Product from "../models/products.model.js";
import Category from "../models/categories.model.js";
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
    const { category } = req.query;
    if (id) {
      if (id.length > 10) {
        const product = await Product.findById(id);
        if (!product) throw new Error("Invalid ID");
        res.json({
          success: true,
          product,
        });
      } else {
        const badgeList = ["Sale", "Featured", "New"];
        if (!badgeList.includes(id)) throw new Error("Invalid Badge");
        const products = await Product.find({ badge: id });
        res.json({
          success: true,
          products,
        });
      }
    } else if (category) {
      const cats = await Category.find({}, "name -_id");
      const catList = cats.map((item) => item.name);
      if (!catList.includes(category)) throw new Error("Category does not exist");
      const products = await Product.find({ category });
      res.json({ success: true, products });
    } else {
      throw new Error("Invalid Param or Query");
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, category, regularPrice, salePrice, description, stock } = req.body;
    const thumbnail = req.file;
    if ((!name, !category, !salePrice, !stock)) throw new Error("Required fields are not given");
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
    const newPath = `public/products/${newName}`;

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
      thumbnail: `products/${newName}`,
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

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = Product.findById(id);
    if (!product) throw new Error("Product does not exist");

    const toDelete = Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Item deleted successfully", item: toDelete });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, regularPrice, salePrice, description, stock } = req.body;
    const thumbnail = req.file;

    if (!name || !category || !salePrice || !stock) throw new Error("Required fields are missing");

    if (regularPrice && regularPrice < salePrice)
      throw new Error("Sale price cannot be higher than regular price");

    if (stock < 1) throw new Error("Stock is less than 1");

    const item = await Product.findById(id);

    if (!item) throw new Error("Invalid product id");

    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
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
