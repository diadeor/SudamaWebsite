import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Admin from "./pages/Admin.tsx";
import Register from "./pages/Register.tsx";
import Cart from "./pages/Cart.tsx";
import { FaCartShopping } from "react-icons/fa6";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Link to="/cart">
        <button className="cart fixed bottom-[5%] left-[5%] bg-yellow-600 p-4 rounded-full shadow-[0px_0px_15px_0px_white] border-2 border-white/50 hover:scale-110 transition duration-300 cursor-pointer">
          <FaCartShopping size="1.5em" color="white" />
        </button>
      </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
