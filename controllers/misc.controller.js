import Customer from "../models/users.model.js";
import Product from "../models/products.model.js";
import Order from "../models/orders.model.js";

export const getCount = async (req, res, next) => {
  try {
    const userCount = await Customer.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    res.json({
      success: true,
      userCount,
      productCount,
      orderCount,
    });
  } catch (error) {
    next(error);
  }
};
