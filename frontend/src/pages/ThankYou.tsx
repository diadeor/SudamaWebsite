import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ item }: { item: any }) => {
  return (
    <div className="item flex flex-row w-full pt-2 pb-2 border-b-2 border-white/20">
      <p className="first w-[60%]">
        {item.name} x <span className="qty">{item.quantity}</span>
      </p>
      <p className="second w-[40%] text-center">Rs.{item.subTotal}</p>
    </div>
  );
};

const ThankYou = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const order = user.order;
  useEffect(() => {
    !order && nav("/");
  }, []);
  const date = new Date(order?.createdAt);
  const created = date.toLocaleString("default", {
    month: "short",
    day: "2-digit",
    year: "2-digit",
  });
  return (
    order && (
      <div className="thanks bg-green-950 min-h-[calc(100vh-70px)] p-10 text-white">
        <div className="inner-container flex flex-col items-center bg-white/10 w-full h-[100%] p-5 rounded-xl">
          <p className="font-bold text-green-400 flex flex-col items-center mt-5">
            <span>
              <FaCircleCheck size="3em" />
            </span>
            <span className="text-4xl mt-4 text-yellow-600">Thank You!</span>
            <span className="text-white text-md font-normal mt-1 text-center">
              We have received your order and will process it as soon as you make your payment
            </span>
          </p>
          <div className="order flex flex-row bg-white/10 rounded-md mt-10 p-5 w-[85%]">
            <p className="order-id text-center border-r-2 min-w-[34%] border-white/20 flex flex-col gap-2">
              <span className="font-bold">Order No.</span>
              <span className="font-bold text-yellow-200 tracking-wider text-lg">{order.tx}</span>
            </p>
            <p className="order-id text-center border-r-2 min-w-[33%] border-white/20 flex flex-col gap-3">
              <span className="font-bold">Date</span>
              <span>{created}</span>
            </p>
            <p className="order-id text-center min-w-[33%] border-white/20 flex flex-col gap-3">
              <span className="font-bold">Total</span>
              <span>Rs.{order.amount}</span>
            </p>
          </div>
          <p className=" mt-10 font-bold text-lg text-center text-yellow-600 mb-3">
            --- Order Items ---
          </p>
          <div className="order-items flex flex-col w-[85%]">
            <div className="title flex flex-row font-bold text-lg border-b-2 border-white/20 w-full mb-2">
              <p className="w-[60%]">Products</p>
              <p className="w-[40%] text-center border-l-2 border-white/20">Total</p>
            </div>
            {order.items &&
              order.items.map((item: any) => {
                return <OrderItem item={item} />;
              })}
            <div className="totals flex flex-row w-full pt-2 pb-2  border-b-2 border-t-2 mt-0.5 border-white/20 font-bold">
              <p className="first w-[60%] text-yellow-500">SubTotal</p>
              <p className="second w-[40%] text-center ">Rs.{order.total}</p>
            </div>
            <div className="totals flex flex-row w-full pt-2 pb-2  border-b-2 border-white/20 font-bold">
              <p className="first w-[60%] text-yellow-500">Discount</p>
              <p className="second w-[40%] text-center ">-Rs.{order.discount}</p>
            </div>
            <div className="totals flex flex-row w-full pt-2 pb-2  border-b-2 border-white/20 font-bold">
              <p className="first w-[60%] text-yellow-500">Order Total</p>
              <p className="second w-[40%] text-center ">Rs.{order.amount}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ThankYou;
