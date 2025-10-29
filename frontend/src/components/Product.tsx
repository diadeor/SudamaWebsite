import { FaCartPlus } from "react-icons/fa6";
import usePost from "../hooks/usePost";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const Product = ({
  image,
  name,
  price,
  regularPrice,
  id,
}: {
  image: string;
  name: string;
  price: number;
  regularPrice?: number;
  id: string;
}) => {
  const [success, setSuccess] = useState("");
  const { setCart } = useCart();
  const request = usePost("/api/v1/carts/add");

  const addToCart = async () => {
    const { data } = await request({ pid: id });
    console.log(data.cart.items);
    if (data.success) {
      setSuccess(data.message);
      setCart(data);
    }
  };
  return (
    <div className="product-card bg-black/40 text-white flex flex-col p-5 rounded-xl border-2 border-black/50">
      {success && (
        <p className="msg bg-green-700 w-60 rounded-full text-center relative font-bold text-md tracking-wide">
          {success}
        </p>
      )}

      <img src={image} alt="" className="w-60" />
      <p className="title text-xl border-t-1 border-white/20 pt-3">{name}</p>
      <div className="action-row pt-3 flex flex-row items-center justify-between">
        <p className="price font-bold text-2xl w-[50%]">
          Rs.{price}
          <sub className="line-through relative top-[-1px] text-sm font-normal pl-1">
            {regularPrice}
          </sub>
        </p>
        <button
          onClick={addToCart}
          className="add-to-cart bg-green-600 rounded-md w-25 h-11 text-center items-center flex flex-row justify-center cursor-pointer transition duration-300 hover:bg-green-800 hover:scale-105"
        >
          <FaCartPlus size="1.8em" />
        </button>
      </div>
    </div>
  );
};

export default Product;
