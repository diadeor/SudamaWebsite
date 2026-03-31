import Category from "../models/categories.model.js";
import uploader from "../config/cloudinary.js";

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
    const { role } = req.user;
    if (role !== "admin") throw new Error("Unauthorized");

    console.log("Update category route");

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

    const uploadStream = uploader.upload_stream(
      { folder: "cats_thumbnail" },
      async (error, result) => {
        if (error) {
          console.error(error);
          throw new Error("Cloudinary upload failed.");
        }
        const imageUrl = result.secure_url;
        console.log(imageUrl);

        const category = await Category.findByIdAndUpdate(
          id,
          {
            $set: { name, thumbnail: imageUrl },
          },
          { new: true },
        );

        return res.json({
          success: true,
          message: "Category updated",
          category,
        });
      },
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!req.file) throw new Error("No image uploaded");
    const { role } = req.user;
    if (role !== "admin") throw new Error("Unauthorized");

    console.log("Create category route");

    const catExists = await Category.findOne({ name });

    if (catExists) throw new Error("Category already exists");

    const uploadStream = uploader.upload_stream(
      { folder: "cats_thumbnail" },
      async (error, result) => {
        if (error) {
          console.error(error);
          throw new Error("Cloudinary upload failed.");
        }
        const imageUrl = result.secure_url;
        console.log(imageUrl);

        const category = await Category.create({
          name,
          thumbnail: imageUrl,
        });
        return res.json({
          success: true,
          message: "New category created",
          category,
        });
      },
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
