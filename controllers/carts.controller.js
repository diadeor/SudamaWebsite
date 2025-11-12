import Cart from "../models/carts.model.js";

export const getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find({});
    res.json({
      success: true,
      data: carts,
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const user = req.user.id;
    const cart = await Cart.findById(user, "items total discount amount");
    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const user = req.user.id;
    const { pid, qty } = req.body;
    const quantity = qty ? Number(qty) : null;

    const cartExists = await Cart.findById(user);

    if (cartExists) {
      const products = cartExists.items.map((item) => `${item.product}`);
      const items = cartExists.items;
      const index = products.indexOf(pid);

      if (index != -1) {
        items[index]["quantity"] += quantity ? quantity : 1;
        const cart = await Cart.findOneAndUpdate(
          { _id: user },
          { $set: { items, total: 0, amount: 0 } },
          { new: true },
        );
        res.json({
          success: true,
          message: "Added to cart",
          cart,
        });
      } else {
        items.push({
          product: pid,
          quantity: quantity ? quantity : 1,
        });
        const cart = await Cart.findOneAndUpdate(
          { _id: user },
          { $set: { items, total: 0, amount: 0 } },
          { new: true },
        );
        res.json({
          success: true,
          message: "Added to cart",
          cart,
        });
      }
    } else {
      const cart = await Cart.create({
        _id: user,
        items: [
          {
            product: pid,
            quantity: quantity ? quantity : 1,
          },
        ],
      });
      res.json({ success: true, message: "Added to cart", cart });
    }
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const user = req.user.id;
    const { id, qty } = req.body;
    const cart = await Cart.findById(user);
    const updatedItems = cart.items.map((item, index) => {
      if (String(item.product) == id) {
        item.quantity = qty;
      }
      return item;
    });
    // console.log(updatedItems);
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: user },
      { $set: { items: updatedItems, amount: 0, total: 0 } },
      { new: true },
    );

    res.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { prod } = req.body;

    const cart = await Cart.findById(id);

    const products = cart.items.map((item) => String(item.product));
    if (products.indexOf(prod) == -1) throw new Error("Product does not exist");

    const newItems = cart.items.filter((item) => String(item.product) != prod);

    const newCart = await Cart.findByIdAndUpdate(id, { $set: { items: newItems } }, { new: true });

    res.json({ success: true, cart: newCart });
  } catch (error) {
    next(error);
  }
};
