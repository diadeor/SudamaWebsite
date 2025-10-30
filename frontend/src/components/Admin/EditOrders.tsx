import { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <p className="flex flex-col bg-white/10 text-white p-3 font-bold gap-2 grow items-center rounded-lg">
      <span className="text-lg border-b-2 w-full text-center border-white/20 pb-1 tracking-wider capitalize">
        {title}
      </span>
      <span className="text-md text-yellow-600">{value}</span>
    </p>
  );
};

type EachItem = {
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
};

type Order = {
  tx: string;
  total: number;
  status: string;
  paymentStatus: string;
  items: Array<EachItem>;
  user: string;
  email: string;
  createdAt: string;
  discount: number;
  amount: number;
};

const EditOrders = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<Order>(Object);
  const [status, setStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const { tx } = useParams();
  const getSingleOrder = useFetch(`/api/v1/orders/${tx}`);
  const request = usePost(`/api/v1/orders/update/${tx}`);

  useEffect(() => {
    (async () => {
      const { data, error } = await getSingleOrder();
      if (data) {
        setData(data.order);
        setStatus(data.order.status);
        setPaymentStatus(data.order.paymentStatus);
      } else {
        setError(error);
      }
    })();
  }, []);

  const handleStatusChange = async (e: any) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const { data, error } = await request({ status: newStatus, paymentStatus });
    if (data && data.success) {
      setSuccess("Order status changed");
    } else {
      setError(error);
    }
  };

  const handlePaymentStatusChange = async (e: any) => {
    const newStatus = e.target.value;
    setPaymentStatus(e.target.value);
    const { data, error } = await request({ status, paymentStatus: newStatus });
    if (data && data.success) {
      setSuccess("Payment status changed");
    } else {
      setError(error);
    }
  };
  return (
    <div className="edit">
      <p className="title text-green-500 font-bold text-2xl">Order #{data.tx}</p>
      {(error || success) && (
        <p
          className={`message ${
            error ? "bg-red-900" : "bg-green-500"
          } p-1 text-center text-white font-bold tracking-wider rounded-full mt-2 `}
        >
          {error || success}
        </p>
      )}
      <div className="second flex flex-col mt-5 gap-3">
        <div className="user-info flex flex-row justify-center gap-3">
          <InfoItem title="User" value={data.user} />
          <InfoItem title="Email" value={data.email} />
          <InfoItem title="Created" value={data.createdAt} />
        </div>
        <div className="items flex flex-col bg-white/10 p-3 text-white rounded-lg">
          <p className="text-center font-bold text-lg border-b-2 border-white/10 pb-1 mb-2">
            Order Items
          </p>
          {data.items &&
            data.items.map((item, index) => {
              return (
                <div
                  className="order-item flex flex-row justify-between text-yellow-600"
                  key={index}
                >
                  <p className="min-w-60 tracking-wider font-bold">{item.name}</p>
                  <p className="min-w-10 text-center ">{item.quantity}</p>
                  <p className="min-w-30 text-right ">Rs. {item.subTotal}</p>
                </div>
              );
            })}
          <hr className="mt-2 border-1 border-white/10" />
          <p className="title flex flex-row mt-2 border-b-2 border-white/10 text-center">
            <span className="w-[70%] font-bold border-r-2 border-white/10">SubTotal</span>
            <span className="w-[30%]">Rs. {data.total}</span>
          </p>
          <p className="title flex flex-row mt-2 border-b-2 border-white/10 text-center">
            <span className="w-[70%] font-bold border-r-2 border-white/10">Discount</span>
            <span className="w-[30%]">-Rs. {data.discount}</span>
          </p>
          <p className="title flex flex-row mt-2 border-b-2 border-white/10 text-center">
            <span className="w-[70%] font-bold border-r-2 border-white/10">Grand Total</span>
            <span className="w-[30%]">Rs. {data.amount}</span>
          </p>
        </div>
        <div className="status flex flex-row justify-center gap-3">
          <div className="order-status bg-white/10 rounded-lg p-3 text-center text-white min-w-[50%]">
            <p className="font-bold text-lg">Order Status</p>
            <select
              name="order-status"
              value={status}
              id=""
              onChange={(e) => handleStatusChange(e)}
              className="text-yellow-600 font-bold outline-0"
            >
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="payment-status bg-white/10 rounded-lg p-3 text-center text-white min-w-[50%]">
            <p className="font-bold text-lg">Payment Status</p>
            <select
              name="payment-status"
              value={paymentStatus}
              onChange={(e) => handlePaymentStatusChange(e)}
              id=""
              className="text-yellow-600 font-bold outline-0"
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrders;
