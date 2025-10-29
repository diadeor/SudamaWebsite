import Order from "../models/orders.model.js";
import Cart from "../models/carts.model.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

const generateTx = async () => {
  const tx = Math.floor(10000 + Math.random() * 90000);
  const txExists = await Order.findOne({ tx });
  txExists && (await generateTx());
  return tx;
};

export const createOrder = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { cart } = req.body;
    const tx = await generateTx();

    const order = await Order.create({
      tx,
      userId: id,
      items: cart.items,
      total: cart.total,
      amount: cart.amount,
      discount: cart.discount,
      shipping: "Bhelai",
    });

    const carts = await Cart.findOneAndUpdate({ _id: id }, { $set: { items: [] } }, { new: true });
    // console.log(carts);
    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
