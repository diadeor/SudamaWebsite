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
      <div className="thanks  min-h-[calc(100vh-70px)] p-10 text-white flex flex-row items-center justify-center">
        <div className="inner-container flex flex-col items-center bg-black/50 w-full h-full p-5 rounded-xl max-w-190">
          <p className="font-bold text-green-400 flex flex-col items-center mt-5">
            <span>
              <FaCircleCheck size="3em" />
            </span>
            <span className="text-4xl mt-4 text-yellow-500 font-lobster tracking-wider">
              Thank You!
            </span>
            <span className="text-white text-md font-normal mt-1 text-center font-poppins">
              We have received your order and will process it as soon as you make your payment
            </span>
          </p>
          <div className="order flex flex-row bg-white/10 rounded-md mt-10 p-5 w-[85%]">
            <p className="order-id text-center border-r-2 min-w-[34%] border-white/20 flex flex-col gap-2">
              <span className="font-bold font-fauna">Order No.</span>
              <span className="font-bold text-yellow-300 tracking-wider text-lg font-jetbrains">
                {order.tx}
              </span>
            </p>
            <p className="order-id text-center border-r-2 min-w-[33%] border-white/20 flex flex-col gap-3">
              <span className="font-bold font-fauna">Date</span>
              <span className="font-jetbrains">{created}</span>
            </p>
            <p className="order-id text-center min-w-[33%] border-white/20 flex flex-col gap-3">
              <span className="font-bold font-fauna">Total</span>
              <span className="font-jetbrains">Rs.{order.amount}</span>
            </p>
          </div>
          <p className=" mt-10 font-bold text-xl tracking-wider text-center text-yellow-500 mb-3 font-lobster">
            --- Order Items ---
          </p>
          <div className="order-items flex flex-col w-[85%] font-fauna">
            <div className="title flex flex-row font-bold text-lg border-b-2 border-white/20 w-full mb-2">
              <p className="w-[60%]">Products</p>
              <p className="w-[40%] text-center border-l-2 border-white/20">Total</p>
            </div>
            {order.items &&
              order.items.map((item: any) => {
                return <OrderItem item={item} />;
              })}
            <div className="totals flex flex-row w-full pt-2 pb-2  border-b-2 border-t-2 mt-0.5 border-white/20 font-bold">
              <p className="first w-[60%] text-yellow-500 font-lobster tracking-widest text-lg">
                SubTotal
              </p>
              <p className="second w-[40%] text-center ">Rs.{order.total}</p>
            </div>
            <div className="totals flex flex-row w-full pt-2 pb-2  border-b-2 border-white/20 font-bold">
              <p className="first w-[60%] text-yellow-500 font-lobster tracking-widest text-lg">
                Discount
              </p>
              <p className="second w-[40%] text-center ">-Rs.{order.discount}</p>
            </div>
            <div className="totals flex flex-col items-center text-yellow-500 justify-center w-full pt-2 pb-2 font-bold">
              <p className="first font-lobster tracking-widest text-2xl">Order Total</p>
              <p className="second font-jetbrains text-lg">Rs.{order.amount}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ThankYou;
