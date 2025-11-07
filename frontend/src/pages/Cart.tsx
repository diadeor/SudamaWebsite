import { useEffect, useState } from "react";
import { FaArrowRight, FaCircleExclamation } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";
import usePost from "../hooks/usePost";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Item = ({
  name,
  pid,
  price,
  subTotal,
  qty,
}: {
  name: string;
  pid: string;
  price: number;
  subTotal: number;
  qty: number;
}) => {
  const { setCart } = useCart();
  const [qtyUser, setQtyUser] = useState(qty);
  const [isDisabled, setIsDisabled] = useState(true);
  const [bgColor, setBgColor] = useState("bg-white/20");
  const [cursor, setCursor] = useState("auto");
  const updateRequest = usePost("/api/v1/carts/update");

  useEffect(() => {
    if (qtyUser == 1) {
      setIsDisabled(true);
      setBgColor("bg-white/10");
      setCursor("cursor-auto");
    } else {
      setIsDisabled(false);
      setBgColor("bg-white/20");
      setCursor("cursor-pointer");
    }
    updateRequest({ id: pid, qty: qtyUser }).then(({ data }) => setCart(data));
  }, [qtyUser]);

  const handleQtyChange = async (target: any) => {
    if (target.classList.contains("subtract")) {
      qtyUser >= 2 && setQtyUser(qtyUser - 1);
    } else {
      setQtyUser(qtyUser + 1);
    }
  };
  return (
    <div className="bg-black/30 p-3 rounded-xl item flex flex-row min-h-20 items-center justify-center border-white/10">
      <div className="info flex flex-col grow">
        <p className="name font-bold text-green-300 tracking-wide font-poppins">{name}</p>
        <p className="category text-sm font-jetbrains font-bold">Rs.{price}</p>
        <div className="qty-input-container flex flex-row items-center mt-2 font-jetbrains">
          <button
            disabled={isDisabled}
            onClick={(e) => handleQtyChange(e.target)}
            className={`subtract font-bold text-2xl ${cursor} ${bgColor} pl-2 pr-2 border border-r-0 border-white/30 rounded-l-md ${
              isDisabled ? "" : "hover:bg-white/30"
            }`}
          >
            -
          </button>
          <input
            type="text"
            name="qty"
            id=""
            min={1}
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
      </div>
      <div className="qty flex flex-col items-end justify-center min-w-20 min-h-full gap-5">
        <p className="total text-center font-bold font-jetbrains">Rs.{subTotal}</p>
        <p className="delete p-2 bg-red-400 rounded-sm">
          <IoTrashOutline size="1.2em" />
        </p>
      </div>
    </div>
  );
};

type Cart = {
  items: Array<Object>;
  total: number;
  discount: number;
  amount: number;
};

const Cart = () => {
  const { cart: data } = useCart();
  const { user, setUser } = useAuth();
  const nav = useNavigate();
  const cart: Cart = data.cart ? data.cart : {};
  const items: Array<Object> | null = cart ? cart?.items : null;
  const checkoutRequest = usePost("/api/v1/orders/create");

  const handleCheckout = async () => {
    const { data } = await checkoutRequest({ cart });
    const updatedUser = {
      ...user,
      order: data.order,
    };
    setUser(updatedUser);
    nav("/thank-you");
  };

  return (
    <div
      className={` w-full cart-container p-5 flex flex-col items-center min-h-[calc(100svh-70px)] pt-5`}
    >
      <h2 className="cart font-bold text-yellow-500 text-3xl mb-10 font-lobster tracking-widest">
        Shopping Cart
      </h2>
      {data.cart && data.cart.items.length != 0 && (
        <div className="items-container w-full max-w-190 flex flex-col">
          <p className="text-white font-bold text-2xl font-lobster tracking-widest mb-3">
            Products
          </p>
          <div className="items flex flex-col text-white gap-3 mb-5">
            {items &&
              items.map((item: any, index: number) => {
                return (
                  <Item
                    key={index}
                    pid={item.product}
                    name={item.name}
                    price={item.price}
                    subTotal={item.subTotal}
                    qty={item.quantity}
                  />
                );
              })}
          </div>
          <p className="text-white font-bold text-2xl font-lobster tracking-widest mb-3">
            Order Summary
          </p>
          <div className="totals flex flex-col bg-black/40 rounded-xl font-lobster tracking-widest">
            <div className="subtotal flex flex-row text-white p-3 pl-6">
              <p className="grow text-center text-xl">SubTotal</p>
              <p className="subTotal w-35 text-center text-xl border-l-2 border-white/30 font-jetbrains">
                {cart?.total}
              </p>
            </div>
            <div className="discount flex flex-row text-white p-3 pl-6">
              <p className="grow text-center text-xl">Discount</p>
              <p className="font-jetbrains discount w-35 text-center text-xl border-l-2 border-white/30">
                -{cart.discount}
              </p>
            </div>
            <div className="grand flex flex-row text-white p-3 pl-6">
              <p className=" grow text-center font-bold text-xl">Grand Total</p>
              <p className="w-35 text-yellow-500 font-jetbrains grand text-center font-bold text-xl border-l-2 border-white/30">
                Rs.{cart.amount}
              </p>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="font-poppins mt-2 text-white bg-yellow-600 h-12 font-bold text-lg tracking-wide w-full rounded-full hover:bg-yellow-800 transition duration-300 hover:scale-102 flex flex-row items-center justify-center gap-2 cursor-pointer"
          >
            Proceed to checkout
            <FaArrowRight />
          </button>
        </div>
      )}
      {(!data.cart || data.cart.items.length == 0) && (
        <p className="h-40 bg-black/30 flex flex-row gap-3 justify-center items-center w-full max-w-180 text-xl font-bold rounded-xl tracking-wide text-red-300">
          <FaCircleExclamation size="1.5em" /> No items in cart
        </p>
      )}
    </div>
  );
};

export default Cart;
