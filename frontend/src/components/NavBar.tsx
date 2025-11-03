import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";

const NavBar = () => {
  const { user } = useAuth();
  const [menu, setMenu] = useState(false);

  const handleMenu = (e: any) => {
    setMenu(!menu);
  };

  return (
    <nav className="font-poppins flex flex-row items-center justify-between px-5 h-[70px] bg-green-300/15 border-b-2 border-green-300/20">
      <Link to="tel:+977 9847440395" className="sm:hidden">
        <IoCallOutline size="1.5em" className="text-yellow-400" />
      </Link>
      <Link to="/">
        <img src={logo} alt="" className="w-8" />
      </Link>
      <FaBarsStaggered
        className="text-yellow-400 sm:hidden cursor-pointer"
        size="1.5em"
        onClick={(e) => handleMenu(e)}
      />
      <div
        className={`${
          menu ? "flex" : "hidden"
        } menu right-0 left-0 top-18 absolute bg-black/30 p-5 rounded-b-xl text-white font-lobster`}
      >
        <p>hi THere</p>
      </div>
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
