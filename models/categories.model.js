import mongoose from "mongoose";

const catSchema = mongoose.Schema({
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", catSchema);

export default Category;
