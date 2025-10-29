import { useEffect, useState } from "react";
import { FaArrowRight, FaCircleExclamation, FaCheck } from "react-icons/fa6";
import { useCart } from "../contexts/CartContext";
import usePost from "../hooks/usePost";

const Item = ({
  name,
  pid,
  cat,
  price,
  subTotal,
  qty,
}: {
  name: string;
  pid: string;
  cat: string;
  price: number;
  subTotal: number;
  qty: number;
}) => {
  const { setCart } = useCart();
  const [qtyUser, setQtyUser] = useState(qty);
  const [isDisabled, setIsDisabled] = useState(true);
  const [bgColor, setBgColor] = useState("bg-gray-500");
  const [cursor, setCursor] = useState("auto");
  const updateRequest = usePost("/api/v1/carts/update");

  useEffect(() => {
    if (qty == qtyUser || qtyUser == 0) {
      setIsDisabled(true);
      setBgColor("bg-gray-500");
      setCursor("auto");
    } else {
      setIsDisabled(false);
      setBgColor("bg-yellow-600");
      setCursor("pointer");
    }
  }, [qtyUser]);

  const handleQtyChange = async () => {
    const { data } = await updateRequest({ id: pid, qty: qtyUser });
    setCart(data);
  };
  return (
    <div className="item flex flex-row min-h-20 items-center justify-center border-b-1 border-white/10">
      <div className="info flex flex-col ">
        <p className="name w-75 font-bold text-green-300 tracking-wide">{name}</p>
        <p className="category text-sm">{cat}</p>
      </div>
      <p className="price w-35 text-center">Rs.{price}</p>
      <div className="qty w-35 flex flex-row justify-center items-center">
        <input
          type="number"
          name="qty"
          id=""
          min={1}
          className="w-15 bg-white/10 border-1 border-white/20 text-center p-1.5 outline-0 rounded-l-md rounded-r-sm"
          value={qtyUser}
          onChange={(e) => setQtyUser(Number(e.target.value))}
        />
        <button
          onClick={handleQtyChange}
          disabled={isDisabled}
          className={`${bgColor} change-qty p-2  rounded-r-md enabled cursor-${cursor} ${
            !isDisabled && "hover:bg-yellow-700"
          } transition duration-300`}
        >
          <FaCheck />
        </button>
      </div>
      <p className="total w-35 text-center font-bold">Rs.{subTotal}</p>
    </div>
  );
};

const Cart = () => {
  const { cart: data } = useCart();
  const cart: Object = data.cart ? data.cart : {};
  const items: Array<Object> = cart ? cart?.items : null;
  const checkoutRequest = usePost("/api/v1/orders/create");

  const handleCheckout = async () => {
    const { data, error } = await checkoutRequest({ cart });
    console.log(data);
  };

  return (
    <div className="cart-container bg-green-950 p-10 flex flex-col items-center min-h-[calc(100vh-70px)]">
      <h2 className="cart font-bold text-yellow-600 text-3xl mb-10">Shopping Cart</h2>
      {data.cart && data.cart.items.length != 0 && (
        <div className="items-container min-w-180 flex flex-col">
          <div className="headers flex flex-row p-3 pl-6 text-white bg-white/20 font-bold tracking-wide rounded-t-xl border-b-2 border-white/40">
            <p className="w-75">Products</p>
            <p className="w-35 text-center">Price</p>
            <p className="w-35 text-center">Quantity</p>
            <p className="w-35 text-center">SubTotal</p>
          </div>
          <div className="items flex flex-col p-3 pl-6 bg-white/20 text-white">
            {items.map((item: any, index: number) => {
              return (
                <Item
                  key={index}
                  pid={item.product}
                  name={item.name}
                  cat={item.category}
                  price={item.price}
                  subTotal={item.subTotal}
                  qty={item.quantity}
                />
              );
            })}
          </div>
          <div className="totals flex flex-col bg-white/20 border-t-2 border-white/40">
            <div className="subtotal flex flex-row text-white p-3 pl-6">
              <p className="w-145 text-center">SubTotal</p>
              <p className="subTotal w-35 text-center text-xl border-l-2 border-white/30">
                {cart?.total}
              </p>
            </div>
            <div className="discount flex flex-row text-white p-3 pl-6">
              <p className="w-145 text-center ">Discount</p>
              <p className="discount w-35 text-center text-xl border-l-2 border-white/30">
                -{cart.discount}
              </p>
            </div>
            <div className="grand flex flex-row text-white p-3 pl-6">
              <p className="w-145 text-center font-bold">Grand Total</p>
              <p className="grand w-35 text-center font-bold text-xl border-l-2 border-white/30">
                Rs. {cart.amount}
              </p>
            </div>
          </div>
          <div className="checkout p-6 pt-4 pb-4 border-t-2 border-white/40 bg-white/20 rounded-b-xl">
            <button
              onClick={handleCheckout}
              className=" text-white bg-yellow-600 h-12 font-bold text-lg tracking-wide w-full rounded-full hover:bg-yellow-800 transition duration-300 hover:scale-102 flex flex-row items-center justify-center gap-2 cursor-pointer"
            >
              Proceed to checkout
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
      {(!data.cart || data.cart.items.length == 0) && (
        <p className="h-40 bg-white/20 flex flex-row gap-3 justify-center items-center w-180 text-xl font-bold rounded-xl tracking-wide text-red-300">
          <FaCircleExclamation size="1.5em" /> No items in cart
        </p>
      )}
    </div>
  );
};

export default Cart;
