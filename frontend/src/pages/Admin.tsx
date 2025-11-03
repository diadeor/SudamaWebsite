import { useAuth } from "../contexts/AuthContext";
import { Option, AdminCard } from "../components/Admin/Misc";
import AdminFetch from "../components/Admin/AdminFetch";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Create from "../components/Admin/CreatePd";
import EditOrders from "../components/Admin/EditOrders";
import EditProducts from "../components/Admin/EditProducts";
import CreateBlogs from "../components/Admin/CreateBlogs";
import { FaUsers, FaLayerGroup, FaCubesStacked, FaFilePen, FaEye } from "react-icons/fa6";
import CreateCategory from "../components/Admin/CreateCat";
// import usePost from "../hooks/usePost";

const Admin = () => {
  const [err, setErr] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState(Object);
  const { user } = useAuth();
  const stats = useFetch("/api/v1/stats");
  const [count, setCount] = useState(3);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await stats();
      data ? setErr("") : setResult("");
      setData(data);
      setErr(error);
    })();
    if (user == null) {
      nav("/login");
    } else if (user.role != "admin") {
      const noAccessTimeout = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      if (count == 0) {
        clearTimeout(noAccessTimeout);
        nav("/profile");
      }
    }
  }, []);

  return user && user.role == "admin" ? (
    <div className="admin-container p-5 flex flex-col items-center min-h-screen pt-5 pb-15">
      <h2 className="font-lobster font-bold text-center text-3xl text-white mb-10">
        Howdy,
        <br /> <span className="text-yellow-500 text-4xl">{user.name}</span>
      </h2>
      <div className="data flex flex-row flex-wrap gap-2 justify-center max-w-185">
        <AdminCard
          icon={<FaUsers />}
          title="users"
          value={data?.userCount}
          subTitle="Last 7 days"
          subValue={400}
          toUrl="/admin/users"
        />
        <AdminCard
          icon={<FaLayerGroup />}
          title="Products"
          value={data?.productCount}
          subTitle="Last 7 days"
          subValue={400}
          toUrl="/admin"
        />
        <AdminCard
          icon={<FaCubesStacked />}
          title="Orders"
          value={data?.orderCount}
          subTitle="Last 7 days"
          subValue={400}
          toUrl="/admin/orders"
        />
        <AdminCard
          icon={<FaFilePen />}
          title="Blogs"
          value={data?.blogCount}
          subTitle="Last 7 days"
          subValue={400}
          toUrl="/admin/blogs"
        />
        <AdminCard
          icon={<FaFilePen />}
          title="Categories"
          value={data?.catCount}
          subTitle="Last 7 days"
          subValue={400}
          toUrl="/admin/cats"
        />
        <AdminCard
          icon={<FaEye />}
          title="Visits"
          value={data?.blogCount}
          subTitle="Last 7 days"
          subValue={400}
          toUrl="/admin/blogs"
        />
      </div>

      <div className="show bg-black/60 mt-2 p-3 pt-3 rounded-xl w-full max-w-185">
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
            path="/*"
            element={
              <AdminFetch
                icon={<FaLayerGroup />}
                title="products"
                url="/api/v1/products"
                errFunc={setErr}
                option={<Option url="/admin/products/create" />}
              />
            }
          />
          <Route
            path="/users"
            element={
              <AdminFetch icon={<FaUsers />} title="users" url="/api/v1/users" errFunc={setErr} />
            }
          />
          <Route
            path="/orders/*"
            element={
              <AdminFetch
                icon={<FaCubesStacked />}
                title="orders"
                url="/api/v1/orders"
                errFunc={setErr}
              />
            }
          />
          <Route
            path="/blogs"
            element={
              <AdminFetch
                icon={<FaFilePen />}
                title="blogs"
                url="/api/v1/blogs"
                errFunc={setErr}
                option={<Option url="/admin/blogs/create" />}
              />
            }
          />
          <Route
            path="/cats"
            element={
              <AdminFetch
                icon={<FaFilePen />}
                title="categories"
                url="/api/v1/categories"
                errFunc={setErr}
                option={<Option url="/admin/cats/create" />}
              />
            }
          />
          <Route path="/products/create" element={<Create />} />
          <Route path="/products/edit/:id" element={<EditProducts />} />
          <Route path="/orders/edit/:tx" element={<EditOrders />} />
          <Route path="/blogs/create/" element={<CreateBlogs />} />
          <Route path="/cats/create/" element={<CreateCategory />} />
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
