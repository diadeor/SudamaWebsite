import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Admin from "./pages/Admin.tsx";
import Register from "./pages/Register.tsx";
import Cart from "./pages/Cart.tsx";
import { IoCartOutline } from "react-icons/io5";
import ThankYou from "./pages/ThankYou.tsx";
import Footer from "./components/Footer.tsx";
import Shop from "./pages/Shop.tsx";
import Billing from "./pages/Checkout.tsx";
import Single from "./pages/SingleProduct.tsx";
import Blogs from "./pages/Blogs.tsx";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Link to="/cart">
        <button className="z-15 cart fixed bottom-[5%] left-[5%] bg-yellow-600 p-4 rounded-full shadow-[0px_0px_15px_0px_white] hover:scale-110 transition duration-300 cursor-pointer">
          <IoCartOutline size="1.5em" color="white" />
        </button>
      </Link>
      <div className="home-container flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/checkout" element={<Billing />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs:id" element={<Blogs />} />
          <Route path="/products/:id" element={<Single />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
