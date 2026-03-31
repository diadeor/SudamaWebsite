import Product from "../models/products.model.js";
import Category from "../models/categories.model.js";
import uploader from "../config/cloudinary.js";

export const getProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.json({
        success: true,
        products,
      });
    } else {
      const products = await Product.find({});
      res.json({
        success: true,
        products,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length > 10) {
      const product = await Product.findById(id);
      if (!product) throw new Error("Invalid ID");
      res.json({
        success: true,
        product,
      });
    } else {
      const badgeList = ["sale", "featured", "new"];
      if (!badgeList.includes(id.toLowerCase())) throw new Error("Invalid Badge");
      const products = await Product.find({ badge: id.toLowerCase() });
      res.json({
        success: true,
        products,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "admin") throw new Error("Unauthorized");

    // Log
    console.log("Create product route by", id);

    const { name, category, regularPrice, salePrice, description, stock, badge } = req.body;
    if (!req.file) throw new Error("No image uploaded");

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

    const uploadStream = uploader.upload_stream(
      { folder: "product_thumbnail" },
      async (error, result) => {
        if (error) {
          console.error(error);
          throw new Error("Cloudinary upload failed.");
        }
        const imageUrl = result.secure_url;
        console.log(imageUrl);

        const product = await Product.create({
          name,
          badge,
          category,
          regularPrice,
          salePrice,
          stock,
          description,
          thumbnail: imageUrl,
        });

        return res.status(200).json({
          success: true,
          message: "New Product Created",
          data: {
            product,
          },
        });
      },
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;

    if (role !== "admin") throw new Error("Unauthorized");

    // Log
    console.log("Delete product route by", userId);
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
    const { id: userId, role } = req.user;

    if (role !== "admin") throw new Error("Unauthorized");

    // Log
    console.log("Update product route by", userId);
    const { id } = req.params;
    const { name, category, regularPrice, salePrice, description, stock, badge } = req.body;
    if (!req.file) throw new Error("No image uploaded");
    const thumbnail = req.file;

    if (!name || !category || !salePrice || !stock) throw new Error("Required fields are missing");

    if (regularPrice && Number(salePrice) > Number(regularPrice)) {
      throw new Error("Sale price cannot be higher than regular price");
    }
    if (stock < 1) throw new Error("Stock is less than 1");

    const item = await Product.findById(id);

    if (!item) throw new Error("Invalid product id");

    const uploadStream = uploader.upload_stream(
      { folder: "product_thumbnail" },
      async (error, result) => {
        if (error) {
          console.error(error);
          throw new Error("Cloudinary upload failed.");
        }
        const imageUrl = result.secure_url;
        console.log(imageUrl);

        const product = await Product.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              category,
              regularPrice,
              salePrice,
              stock,
              badge,
              description,
              thumbnail: imageUrl,
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
      },
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
