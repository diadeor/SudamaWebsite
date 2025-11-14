import Customer from "../models/users.model.js";
import Product from "../models/products.model.js";
import Order from "../models/orders.model.js";
import Blog from "../models/blogs.model.js";
import Category from "../models/categories.model.js";
import Visit from "../models/visits.model.js";

export const getCount = async (req, res, next) => {
  try {
    const userCount = await Customer.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const blogCount = await Blog.countDocuments();
    const catCount = await Category.countDocuments();
    const visitCount = await Visit.countDocuments();
    // const visitersCount = await

    res.json({
      success: true,
      userCount,
      productCount,
      orderCount,
      blogCount,
      catCount,
      visitCount,
    });
  } catch (error) {
    next(error);
  }
};
