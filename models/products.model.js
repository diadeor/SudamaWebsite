import mongoose from "mongoose";
import Category from "./categories.model.js";

const getCategories = async () => {
  const categories = await Category.find({});
};

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
    thumbnail: {
      type: String,
      required: false,
      trim: true,
    },
    images: {
      type: [String],
      required: false,
    },
    badge: {
      type: String,
      enum: ["Sale", "Featured", "New", ""],
      default: "",
    },
    description: {
      type: String,
      required: false,
      trim: true,
      minLength: 5,
    },
    regularPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Indoor", "Outdoor", "Fruits"],
      required: true,
      default: "Indoor",
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
