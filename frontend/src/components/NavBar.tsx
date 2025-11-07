import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBarsStaggered, FaCircleXmark, FaUserTie } from "react-icons/fa6";
import {
  IoCallOutline,
  IoPersonOutline,
  IoBookOutline,
  IoHomeOutline,
  IoStorefrontOutline,
  IoLogInOutline,
} from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const ListItem = ({
  title,
  Icon,
  link,
  bg,
}: {
  title: string;
  Icon: any;
  link: string;
  bg?: string;
}) => {
  return (
    <Link to={link}>
      <li
        className={`${bg} px-5 rounded-md h-12 flex flex-row gap-2 items-center justify-center min-w-30`}
      >
        <Icon />
        {title}
      </li>
    </Link>
  );
};

const NavBar = () => {
  const { user } = useAuth();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
    document.body.classList.toggle("menu-is-open");
  };

  return (
    <nav className="justify-center flex flex-row bg-green-300/15">
      <div className="w-full max-w-6xl inner-menu font-poppins flex flex-row items-center justify-between px-5 h-[70px] border-b-2 border-green-300/20">
        <Link to="tel:+977 9847440395" className="sm:hidden">
          <IoCallOutline size="1.5em" className="text-yellow-400" />
        </Link>
        <Link to="/">
          <img src={logo} alt="" className="w-8" />
        </Link>
        <FaBarsStaggered
          className="text-yellow-400 sm:hidden cursor-pointer"
          size="1.5em"
          onClick={handleMenu}
        />
        <div
          className={` menu-overlay h-screen w-full fixed top-0 left-0 border-white ${
            menu ? "block" : "hidden"
          } z-15`}
        ></div>
        <div
          className={`${
            menu ? "flex" : "hidden"
          } z-20 right-0 flex-col items-center justify-center menu w-full h-svh top-0 bottom-0 fixed bg-black/50 backdrop-blur-lg text-white font-lobster`}
        >
          <FaCircleXmark
            className="absolute top-10 right-10 text-yellow-500 hover:scale-120 cursor-pointer transition duration-300"
            size="2em"
            onClick={handleMenu}
          />
          {user && (
            <p className="font-bold text-3xl text-center tracking-wider mb-10">
              Hi,
              <span className="text-yellow-500 "> {user.name.split(" ")[0]}</span>
            </p>
          )}
          <ul
            className="font-poppins flex flex-col gap-3 items-center text-center text-xl"
            onClick={handleMenu}
          >
            <ListItem title="Home" Icon={IoHomeOutline} link="/" />
            <ListItem title="Shop" Icon={IoStorefrontOutline} link="/shop" />
            <ListItem title="About" Icon={IoBookOutline} link="/" />
            {user && <ListItem title="Profile" Icon={IoPersonOutline} link="/profile" />}
            {!user && (
              <ListItem
                title="Login / Register"
                Icon={IoLogInOutline}
                link="/login"
                bg="bg-yellow-700"
              />
            )}
            {user && user.role == "admin" && (
              <ListItem title="Admin" Icon={FaUserTie} link="/admin" />
            )}
          </ul>
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
      </div>
    </nav>
  );
};

export default NavBar;
