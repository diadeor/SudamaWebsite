import { useRef, useState } from "react";
import { FormInput, FormLabel } from "../components/Form";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, setUser } = useAuth();
  const { cart } = useCart().cart;
  const item = cart.items;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>("bg-zinc-500");
  const form = useRef<HTMLFormElement>(null);
  const checkoutRequest = usePost("/api/v1/orders/create");
  const nav = useNavigate();

  const handleFormChange = () => {
    if (!form.current) return;
    const formData = new FormData(form.current);
    if (
      (formData.get("name"), formData.get("email"), formData.get("mobile"), formData.get("street"))
    ) {
      setIsDisabled(false);
      setBgColor("bg-yellow-600");
    } else {
      setIsDisabled(true);
      setBgColor("bg-zinc-500");
    }
  };

  const handlePayment = async () => {
    if (!form.current) return;
    const formData = new FormData(form.current);
    const [name, email, mobile, street, maps, landmark] = [
      formData.get("name"),
      formData.get("email"),
      formData.get("mobile"),
      formData.get("street"),
      formData.get("maps"),
      formData.get("landmark"),
    ];

    const shipping = {
      name,
      email,
      mobile,
      street,
      maps,
      landmark,
    };

    const { data, error } = await checkoutRequest({ cart, shipping });
    if (data.success) {
      setUser({ ...user, order: data.order });
      nav("/thank-you");
    }
  };

  return (
    <div className="w-full font-lobster cat-shop-container p-5 flex flex-col items-center min-h-svh pb-15 text-white max-w-6xl">
      <h2 className="title font-bold text-yellow-500 text-4xl">Checkout</h2>
      <p className="subtitle font-fauna mb-10 mt-1 text-center">
        Please fill all the mandatory fields to proceed with your order
      </p>
      <div className="gap-5 items-container w-full flex flex-row flex-wrap">
        <div className="w-full md:max-w-[48%]">
          <p className="text-white font-bold text-2xl font-lobster tracking-widest mb-3">
            Billing & Shipping
          </p>
          <form
            ref={form}
            onChange={handleFormChange}
            className="shipping flex flex-col bg-black/50 p-5 rounded-md pb-2"
          >
            <FormLabel name="name" />
            <FormInput name="name" type="text" value={user.name} />
            <FormLabel name="email" />
            <FormInput name="email" type="email" value={user.email} />
            <FormLabel name="Phone Number" labelFor="mobile" />
            <FormInput name="mobile" type="number" />
            <FormLabel name="street" />
            <FormInput name="street" type="text" />
            <FormLabel name="Google Maps Link (optional)" req={false} labelFor="maps" />
            <FormInput name="maps" type="text" />
            <FormLabel name="nearest landmark (if any)" labelFor="landmark" req={false} />
            <FormInput name="landmark" type="text" />
          </form>
        </div>
        <div className="w-full md:max-w-[49%] items-container flex flex-col">
          <p className="text-white font-bold text-2xl font-lobster tracking-widest mb-3">
            Order Items
          </p>
          <div className="items flex flex-col gap-2 bg-black/40 w-full rounded-md p-3">
            {item &&
              item.map((element: any, index: number) => {
                return (
                  <p
                    className=" flex flex-row justify-between items-center font-poppins"
                    key={index}
                  >
                    <span className="font-bold w-60 grow">{element.name}</span>
                    <span className=" min-w-15 text-center">{element.quantity}</span>
                    <span className="min-w-25 text-right">Rs.{element.subTotal}</span>
                  </p>
                );
              })}
          </div>
          <div className="items-container w-full max-w-190 flex flex-col mt-5">
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
                <p className="w-35 text-yellow-500 font-poppins grand text-center font-bold text-xl border-l-2 border-white/30">
                  Rs.{cart.amount}
                </p>
              </div>
            </div>
            <div className="payment rounded-md bg-black/40 mt-5 p-3 font-poppins flex flex-col justify-center">
              <div className="one flex flex-row items-center bg-black/20 p-3 rounded-lg">
                <input type="radio" name="payment" id="" className="" defaultChecked required />
                <div className="it justify-center flex flex-col pl-3">
                  <label htmlFor="payment" className="font-bold">
                    Pay via QR
                  </label>
                  <p>Scan QR code to pay</p>
                </div>
              </div>
              <p className="font-poppins mt-2 p-2">
                Estimated delivery: <span className="font-bold">5-7 days</span>
              </p>
            </div>
          </div>
          <button
            disabled={isDisabled}
            onClick={handlePayment}
            className={`cursor-pointer font-poppins font-medium ${bgColor} text-center mt-5 py-2 rounded-full text-xl ${
              isDisabled ? "" : "hover:bg-yellow-700"
            } transition duration-200`}
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
