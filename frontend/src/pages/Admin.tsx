import { useAuth } from "../contexts/AuthContext";
import { Option, AdminCard } from "../components/Admin/Misc";
import AdminFetch from "../components/Admin/AdminFetch";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Create from "../components/Admin/CreatePd";
// import usePost from "../hooks/usePost";

const Admin = () => {
  const [err, setErr] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState(Object);
  const { user } = useAuth();
  const userCount = useFetch("/api/v1/stats");
  const [count, setCount] = useState(3);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await userCount();
      data ? setErr("") : setResult("");
      setData(data);
      setErr(error);
    })();
  }, []);
  if (user.role != "admin") {
    const noAccessTimeout = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count == 0) {
      clearTimeout(noAccessTimeout);
      nav("/profile");
    }
  } else if (user == null) {
    nav("/login");
  }

  return user.role == "admin" ? (
    <div className="admin-container bg-green-950 p-10 flex flex-col items-center min-h-[calc(100vh-70px)]">
      <h2 className="font-bold text-center text-3xl text-white mb-10">
        Howdy,
        <br /> <span className="text-yellow-600 text-4xl">{user.name}</span>
      </h2>
      <div className="data flex flex-row flex-wrap gap-5 justify-center">
        <Link to="/admin/users">
          <AdminCard title="users" value={data?.userCount} subTitle="Last 7 days" subValue={400} />
        </Link>
        <Link to="/admin">
          <AdminCard
            title="Products"
            value={data?.productCount}
            subTitle="Last 7 days"
            subValue={400}
          />
        </Link>
        <Link to="/admin/orders">
          <AdminCard
            title="Orders"
            value={data?.orderCount}
            subTitle="Last 7 days"
            subValue={400}
          />
        </Link>
        <Link to="/admin/blogs">
          <AdminCard
            title="Blogs"
            value={data?.productCount}
            subTitle="Last 7 days"
            subValue={400}
          />
        </Link>
      </div>

      <div className="show bg-black/40 mt-5 p-5 pt-3 rounded-xl w-195">
        {(err || result) && (
          <p
            className={`error mb-3 bg-${
              err ? "red" : "green"
            }-900 w-[100%] text-center p-1 pl-3 pr-3 rounded-md`}
          >
            {err || result?.message}
          </p>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <AdminFetch
                title="products"
                url="/api/v1/products"
                errFunc={setErr}
                option={<Option url="/admin/products/create" />}
              />
            }
          />
          <Route
            path="/users"
            element={<AdminFetch title="users" url="/api/v1/users" errFunc={setErr} />}
          />
          <Route
            path="/orders"
            element={<AdminFetch title="orders" url="/api/v1/orders" errFunc={setErr} />}
          />
          <Route
            path="/blogs"
            element={<AdminFetch title="users" url="/api/v1/users" errFunc={setErr} />}
          />
          <Route path="/products/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div className="no-access bg-green-950 h-[calc(100vh-70px)] flex flex-col justify-center items-center">
      <p className="font-bold text-3xl text-yellow-600 text-center">
        You can not access this page
        <br />{" "}
        <span className="text-lg text-white">
          You will be redirected in
          {` ${count} `}
          seconds
        </span>
      </p>
    </div>
  );
};

export default Admin;
