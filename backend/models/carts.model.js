import mongoose, { set } from "mongoose";
import Product from "./products.model.js";

const itemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [itemSchema],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);
// async function setup(next) {
//   try {
//     let totalAmt = 0;
//     this.items = await Promise.all(
//       this.items.map(async (item) => {
//         const prod = await Product.findById(item.product);
//         item.price = prod.salePrice;
//         item.subTotal = item.quantity * item.price;
//         totalAmt += item.subTotal;
//         return item;
//       }),
//     );
//     this.total = totalAmt;
//     if (!this.discount) this.discount = 0;
//     this.amount = this.total - this.discount;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

cartSchema.pre("findOneAndUpdate", async function (next) {
  try {
    let totalAmt = 0;
    let items = this._update["$set"].items;
    // console.log(items);
    items = await Promise.all(
      items.map(async (item) => {
        const prod = await Product.findById(item.product);
        item.name = prod.name;
        item.category = prod.category;
        item.price = prod.salePrice;
        item.subTotal = item.quantity * item.price;
        totalAmt += item.subTotal;
        return item;
      }),
    );
    this._update["$set"].total = totalAmt;
    if (!this.discount) this.discount = 0;
    this._update["$set"].amount = this._update["$set"].total - this.discount;
    next();
  } catch (error) {
    next(error);
  }
});
cartSchema.pre("validate", async function (next) {
  try {
    let totalAmt = 0;
    this.items = await Promise.all(
      this.items.map(async (item) => {
        const prod = await Product.findById(item.product);
        item.name = prod.name;
        item.category = prod.category;
        item.price = prod.salePrice;
        item.subTotal = item.quantity * item.price;
        totalAmt += item.subTotal;
        return item;
      }),
    );
    this.total = totalAmt;
    if (!this.discount) this.discount = 0;
    this.amount = this.total - this.discount;
    next();
  } catch (error) {
    next(error);
  }
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
