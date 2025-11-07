import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [err, setErr] = useState("");
  const [result, setResult] = useState<string | Object>("");
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
          className="text-lg bg-yellow-600 p-2 rounded-sm cursor-pointer hover:scale-95 transition duration-200"
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

    return (
      <div className=" text-white rounded-lg flex flex-col gap-2">
        {orders.map((order, index) => {
          return (
            <div className="item rounded-lg bg-white/10 p-3 flex flex-row gap-2" key={index}>
              <div className="left font-fauna">
                <p className=" text-lg text-yellow-500 font-bold">#{order.tx}</p>
                <p className="bg-white/10 p-2 rounded-sm text-center text-sm">
                  <span className="font-bold tracking-widest font-lobster">Total</span> <br />
                  <span className="">Rs.{order.total}</span>
                </p>
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
                      <span className="spanrice">Rs.{item.subTotal}</span>
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
  return (
    <div className="font-lobster profile-container min-h-[calc(100svh-70px)] w-full p-5 tracking-wide flex flex-row justify-center items-center">
      <div className="inner-container flex flex-col bg-black/40 p-6 pt-6 rounded-md w-full">
        <h2 className="text-center text-white font-bold text-4xl mb-5">
          Welcome,
          <br />
          <span className="text-yellow-500 tracking-wider">{user?.name}</span>
        </h2>

        <div className="font-poppins tracking-wider tabs flex flex-row grow w-full mb-5 bg-white/10 text-center rounded-md overflow-hidden cursor-pointer text-white font-bold">
          <Link to="/profile" className="grow bg-white/30 p-3">
            <p className="">Profile</p>
          </Link>
          <Link to="/profile/orders" className="grow p-3">
            <p className="">Orders</p>
          </Link>
          <Link to="/profile/password" className="grow p-3">
            <p className="">Password</p>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
