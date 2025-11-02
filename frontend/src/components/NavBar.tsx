import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  return (
    <nav className="font-poppins fixed top-3 left-3 right-3 flex flex-row items-center justify-between pl-5 pr-5 h-[70px] bg-green-300/15 rounded-xl backdrop-blur-sm shadow-md border border-white/30 z-15">
      <Link to="tel:+977 9847440395">
        <IoCallOutline size="1.5em" className="text-yellow-400 sm:hidden" />
      </Link>
      <Link to="/">
        <img src={logo} alt="" className="w-8" />
      </Link>
      <FaBarsStaggered className="text-yellow-400 sm:hidden" size="1.5em" />
      <ul className="font-lobster tracking-widest flex-row gap-5 text-white font-bold text-xl items-center hidden sm:flex">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#popular">Popular</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          {user ? (
            <Link to={user.role == "admin" ? "/admin" : "/profile"}>
              <button className="p-2 pl-4 pr-4 bg-green-600 rounded-sm cursor-pointer hover:scale-107 transition duration-200 font-medium">
                {user.role != "admin" ? `Hi, ${user.name.split(" ")[0]}` : "Hi, admin"}
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="p-2 pl-4 pr-4 bg-yellow-600 rounded-sm cursor-pointer hover:scale-107 transition duration-200 font-medium">
                Login
              </button>
            </Link>
          )}
        </li>
      </ul>

      <IoCallOutline size="1.5em" className="text-yellow-400 hidden sm:block" />
    </nav>
  );
};

export default NavBar;
