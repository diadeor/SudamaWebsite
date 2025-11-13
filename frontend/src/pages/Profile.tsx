import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";
import { FormInput, FormLabel } from "../components/Form";
import Top from "../components/Top";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("profile");
  const [result, setResult] = useState<string | { message: string }>("");
  const [emailField, setEmailField] = useState(user?.email);
  const [nameField, setNameField] = useState(user?.name);
  const URI = `/api/v1/users/update/${user?.id}`;
  const req = usePost(URI);
  const getReq = useFetch("/api/v1/auth/logout");
  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/login");
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const creds = {
        name: nameField,
        email: emailField,
      };
      const { data, error } = await req(creds);
      data ? setErr("") : setResult("");
      data ? setUser(data.data) : null;
      console.log(data, error);
      setResult(data);
      setErr(error);

      // const { data, error } = usePost(`/api/v1/users/update/${user.id}`);
      // console.log(data, error);
    } catch (error) {
      setErr("Error handling update");
    }
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await getReq();
      data ? setErr("") : setResult("");
      data ? setUser(null) : null;
      setResult(data);
      setErr(error);
      nav("/login");
    } catch (error) {
      setErr("Error while signing out");
    }
  };
  const Form = () => {
    return (
      <form
        onSubmit={(e) => handleUpdate(e)}
        className=" flex flex-col text-white tracking-widest rounded-md font-bold"
      >
        {(err || result) && (
          <p
            className={`error mb-3 bg-${
              err ? "red" : "green"
            }-900 w-full text-center p-1 pl-3 pr-3 rounded-md`}
          >
            {err || result?.message}
          </p>
        )}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          className="font-fauna h-12 text-yellow-500 bg-white/10 border border-white/20 mb-7 pl-4"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          className="font-fauna h-12 text-yellow-500 bg-white/10 border border-white/20 mb-7 pl-4"
        />
        <input
          type="submit"
          value="Save"
          className="text-xl font-poppins bg-yellow-600 p-2 rounded-sm cursor-pointer hover:scale-95 transition duration-200"
        />
        <button
          onClick={(e) => handleLogout(e)}
          className="log-out p-2.5 bg-gray-500 mt-3 rounded-sm cursor-pointer hover:scale-95 transition duration-200 flex flex-row items-center justify-center gap-2"
        >
          <FaRightFromBracket />
          Sign Out
        </button>
      </form>
    );
  };

  const Orders = () => {
    const getOrders = useFetch("/api/v1/orders/me");
    const [orders, setOrder] = useState<Array<Object>>([]);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const { data } = await getOrders();
          // console.log(data.orders);
          data.success && setOrder(data.orders);
        } catch (error) {
          setErr("Error while fetching orders");
        }
      };
      fetchOrders();
    }, []);
    const handlePay = (order: any) => {
      setUser({ ...user, order });
      nav("/thank-you");
    };

    return (
      <div className=" text-white rounded-lg flex flex-col gap-2">
        {orders.map((order, index) => {
          const payment = order.paymentStatus;
          return (
            <div className="item rounded-lg bg-white/10 p-3 flex flex-row gap-2" key={index}>
              <div className="left font-fauna">
                <p className=" text-lg text-yellow-500 font-bold">#{order.tx}</p>
                <p className="bg-white/10 p-2 rounded-sm text-center text-sm">
                  <span className="font-bold tracking-widest font-lobster">Total</span> <br />
                  <span className="font-bold">Rs.{order.total}</span>
                </p>
                {payment === "paid" && (
                  <p className="font-poppins font-bold tracking-wider text-emerald-300 bg-white/10 p-2 rounded-sm text-center text-md mt-2">
                    PAID
                  </p>
                )}
                {payment === "refunded" && (
                  <p className="font-poppins font-bold tracking-wider text-red-300 bg-white/10 p-2 rounded-sm text-center text-md mt-2">
                    RE
                  </p>
                )}
                {payment === "unpaid" && (
                  <button
                    onClick={() => handlePay(order)}
                    className="cursor-pointer hover:scale-95 transition duration-200 w-full font-poppins font-bold tracking-wider text-white bg-green-600 p-2 rounded-sm text-center text-md mt-2"
                  >
                    Pay
                  </button>
                )}
              </div>
              <div className="font-fauna right text-center w-full bg-white/10 rounded-md flex flex-col p-2 pt-0 pb-1">
                <p className="font-lobster font-bold tracking-widest border-b-2 border-white/20">
                  Items
                </p>
                {order.items.map((item) => {
                  return (
                    <p className=" flex flex-row justify-between">
                      <span className="tracking-normal text-left">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-bold">Rs.{item.subTotal}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const Password = () => {
    const isSetup = user.password;
    const [success, setSuccess] = useState("");
    const [err, setErr] = useState("");
    const form = useRef<HTMLFormElement>(null);
    const passRequest = usePost("/api/v1/auth/pass");

    const handlePass = async (e: any) => {
      e.preventDefault();
      if (!form.current) return;
      const formData = new FormData(form.current);
      const [old, newPass, confirm] = [
        formData.get("old"),
        formData.get("newPass"),
        formData.get("confirm"),
      ];
      if (newPass !== confirm) {
        setErr("Passwords do not match");
        return;
      }

      const { data, error } = await passRequest({ old, newPass });
      if (data) {
        setSuccess(data.message);
        setErr("");
      } else {
        setErr(error);
      }
    };

    return (
      <form ref={form} className="flex flex-col" onSubmit={(e) => handlePass(e)}>
        {(err || success) && (
          <p
            className={`text-center text-white font-poppins p-1 ${
              success ? "bg-green-700" : "bg-red-800"
            } font-bold rounded-full text-sm`}
          >
            {success ? success : err}
          </p>
        )}
        {isSetup && (
          <>
            <FormLabel name="Old Password" labelFor="old" />
            <FormInput name="old" type="password" />
          </>
        )}
        <FormLabel name="New Password" labelFor="new" />
        <FormInput name="newPass" type="password" />
        <FormLabel name="Confirm New Password" labelFor="confirm" />
        <FormInput name="confirm" type="password" />
        <input
          type="submit"
          value="Change Password"
          className="font-bold text-white bg-yellow-600 text-xl font-poppins p-2 rounded-sm cursor-pointer hover:scale-95 transition duration-200"
        />
      </form>
    );
  };

  return (
    <div className="font-lobster profile-container min-h-[calc(100svh-70px)] w-full max-w-6xl p-5 tracking-wide flex flex-col items-center">
      <Top title="Welcome," oneLine={false} sub={false} title_new_line={user?.name} />
      <div className="relative font-poppins tracking-wider tabs flex flex-row items-center w-full mb-5 bg-black/20 text-center rounded-md overflow-hidden cursor-pointer text-white font-bold">
        <div
          className={` bar absolute h-12 rounded-md bg-black/20 w-[33%] max-w-md ${
            tab == "orders" ? "left-[33%]" : tab == "password" ? "left-[67%]" : "left-0"
          } transition-all duration-200`}
        ></div>
        <Link to="/profile" className="z-10 p-3 w-[33%]" onClick={() => setTab("profile")}>
          <p className="">Profile</p>
        </Link>
        <Link to="/profile/orders" className="z-10 p-3 w-[33%]" onClick={() => setTab("orders")}>
          <p className="">Orders</p>
        </Link>
        <Link
          to="/profile/password"
          className="z-10 p-3 w-[33%]"
          onClick={() => setTab("password")}
        >
          <p className="">Password</p>
        </Link>
      </div>
      <div className="inner-container flex flex-col bg-black/40 p-6 pt-6 rounded-md w-full">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/password" element={<Password />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
