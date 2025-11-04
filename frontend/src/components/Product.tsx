import { FaCartPlus } from "react-icons/fa6";
import usePost from "../hooks/usePost";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

type product = {
  _id: string;
  salePrice: number;
  regularPrice: number;
  name: string;
  category: string;
  thumbnail: string;
};

const Product = ({ pd }: { pd: product }) => {
  const [success, setSuccess] = useState("");
  const { setCart } = useCart();
  const request = usePost("/api/v1/carts/add");
  const { user } = useAuth();

  const addToCart = async () => {
    !user && setSuccess("User not logged in");
    const { data } = await request({ pid: pd._id });
    if (data.success) {
      setSuccess(data.message);
      setCart(data);
    }
  };
  return (
    <div className="min-w-46 product-card bg-black/50 text-white flex flex-col p-3 rounded-xl">
      {success && (
        <p className="msg bg-green-700 w-60 rounded-full text-center relative font-bold text-md tracking-wide p-0.5">
          {success}
        </p>
      )}

      <img
        src={`http://localhost:5000/${pd.thumbnail}`}
        alt=""
        className=" w-40 hover:scale-120 transition duration-400"
      />
      <p className="font-jetbrains extra absolute bg-rose-900 tracking-wide font-bold text-white p-1 px-3 text-center min-w-15 text-sm rounded-full">
        -{Math.floor(((pd.regularPrice - pd.salePrice) / pd.salePrice) * 100)}%{/* New */}
      </p>
      <p className="font-fauna title text-md border-t border-white/20 pt-1">{pd.name}</p>
      <p className="font-jetbrains text-xs">{pd.category}</p>
      <div className="action-row flex flex-col justify-center">
        <p className="font-jetbrains price font-bold text-lg w-[50%] text-yellow-500 mb-2">
          Rs.{pd.salePrice}
          <sub className="line-through relative -top-px text-sm font-normal pl-1">
            {pd.regularPrice}
          </sub>
        </p>
        <button
          onClick={addToCart}
          className="font-fauna gap-2 add-to-cart text-sm uppercase font-bold bg-green-600 rounded-sm w-full h-9 text-center items-center justify-center flex flex-row cursor-pointer transition duration-300 hover:bg-green-800 hover:scale-105"
        >
          Add to cart
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default Product;
