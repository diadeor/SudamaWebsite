import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

type Product = {
  name: string;
  thumbnail: string;
  category: string;
  description: string;
  regularPrice: number;
  salePrice: number;
};

const Single = () => {
  const { id } = useParams();
  const prodReq = useFetch(`/api/v1/products/${id}`);
  const [product, setProduct] = useState<Product>();
  const [qtyDisabled, setQtyDisabled] = useState(true);
  const [qtyUser, setQtyUser] = useState(1);
  const [bgColor, setBgColor] = useState("bg-white/20");
  const [cursor, setCursor] = useState("auto");
  const updateRequest = usePost("/api/v1/carts/update");
  const request = usePost("/api/v1/carts/add");
  const { setCart } = useCart();
  const { user } = useAuth();

  if (!id) return;
  const valid = id?.length > 20;

  useEffect(() => {
    const fetchProd = async () => {
      const { data, error } = await prodReq();
      if (!error) {
        setProduct(data.product);
      }
    };

    valid && fetchProd();
  }, []);

  useEffect(() => {
    if (qtyUser == 1) {
      setQtyDisabled(true);
      setBgColor("bg-white/10");
      setCursor("cursor-auto");
    } else {
      setQtyDisabled(false);
      setBgColor("bg-white/20");
      setCursor("cursor-pointer");
    }
  }, [qtyUser]);

  const addToCart = async () => {
    // !user && setSuccess("User not logged in");
    const { data } = await request({ pid: id, qty: qtyUser });
    if (data.success) {
      setCart(data);
    }
  };

  const handleQtyChange = async (target: any) => {
    if (target.classList.contains("subtract")) {
      qtyUser >= 2 && setQtyUser(qtyUser - 1);
    } else {
      setQtyUser(qtyUser + 1);
    }
  };

  return (
    <div className="prod-container flex flex-row justify-center flex-wrap min-h-[calc(100svh-70px)] p-5 max-w-6xl w-full">
      {valid && product ? (
        <div className="prod w-full flex flex-row flex-wrap justify-center gap-5">
          <img
            src={`http://localhost:5000/${product.thumbnail}`}
            alt=""
            className="w-100 h-100 border-2"
          />
          <div className="border-2 details bg-black/20 p-3 rounded-md text-white backdrop-blur-md w-[calc(100vw - 200px)]">
            <p className="text-yellow-500 font-bold text-2xl font-poppins tracking-wide">
              {product.name}
            </p>

            <p className="font-fauna text-sm">{product.category}</p>

            <p className="bg-black/20 p-2 rounded-sm mt-2 font-poppins">{product.description}</p>
            <p className="mt-5">
              <span className="text-2xl font-bold ">Rs.{product.salePrice}</span>{" "}
              <span className="text-sm line-through">{product.regularPrice}</span>
            </p>

            <div className="last flex flex-row items-center gap-3 mt-5">
              <div className="qty-input-container flex flex-row items-center font-jetbrains">
                <button
                  disabled={qtyDisabled}
                  onClick={(e) => handleQtyChange(e.target)}
                  className={`subtract font-bold text-2xl ${cursor} ${bgColor} pl-2 pr-2 border border-r-0 border-white/30 rounded-l-md ${
                    qtyDisabled ? "" : "hover:bg-white/30"
                  }`}
                >
                  -
                </button>
                <input
                  type="text"
                  name="qty"
                  id=""
                  className="w-12 bg-white/10 border border-white/20 text-center p-1 outline-0"
                  value={qtyUser}
                  readOnly
                />
                <button
                  onClick={(e) => handleQtyChange(e.target)}
                  className="addition font-bold text-2xl bg-white/20 pl-2 pr-2 border border-l-0 border-white/30 rounded-r-md hover:bg-white/30 transition duration-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className="font-fauna gap-2 add-to-cart text-sm uppercase font-bold bg-green-600 rounded-sm w-full h-9 text-center items-center justify-center flex flex-row cursor-pointer transition duration-300 hover:bg-green-800 hover:scale-105"
              >
                Add to cart
                <FaCartPlus />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="rounded-xl font-bold text-2xl text-white tracking-wider font-lobster bg-white/20 flex flex-col items-center justify-center h-50 w-full">
          Invalid product id
        </p>
      )}
    </div>
  );
};
Object;

export default Single;
