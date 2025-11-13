import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBarsStaggered, FaCircleXmark, FaMagnifyingGlass, FaUserTie } from "react-icons/fa6";
import {
  IoCallOutline,
  IoPersonOutline,
  IoBookOutline,
  IoHomeOutline,
  IoStorefrontOutline,
  IoLogInOutline,
  IoReaderOutline,
} from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useItem } from "../contexts/ItemContext";

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

type Item = {
  _id: string;
  name: string;
  title: string;
  description: string;
  salePrice: number;
  regularPrice: number;
};

const NavBar = () => {
  const { user } = useAuth();
  const { products, blogs } = useItem();
  const items = [...products, ...blogs];
  const [menu, setMenu] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchInput, setSearchInput] = useState<string>();
  const [searchProd, setSearchProd] = useState<Array<Item>>();

  const handleMenu = () => {
    setMenu(!menu);
    document.body.classList.toggle("menu-is-open");
  };

  const toggleSearch = () => {
    setSearchToggle(!searchToggle);
    setSearchInput("");
  };

  useEffect(() => {
    const temp = items.filter((item: any) => {
      const lowerName = `${item.title ? item.title : item.name}`.toLowerCase();
      const lowerSearch = searchInput?.toLowerCase();
      return lowerSearch && lowerName.includes(lowerSearch);
    });
    setSearchProd(temp);
  }, [searchInput]);

  return (
    <nav className="justify-center flex flex-row bg-green-300/15">
      <div className="w-full max-w-6xl inner-menu font-poppins flex flex-row items-center justify-between px-5 h-[70px] border-b-2 border-green-300/20 md:justify-start">
        <Link to="tel:+977 9847440395" className="sm:hidden">
          <IoCallOutline size="1.5em" className="text-yellow-500" />
        </Link>
        <Link to="/" className="pl-5 sm:pl-0 md:w-1/20">
          <img src={logo} alt="" className="w-8" />
        </Link>
        <div className="flex flex-row items-center gap-5">
          <FaMagnifyingGlass
            size="1.3em"
            className="text-yellow-500 cursor-pointer sm:hidden"
            onClick={toggleSearch}
          />
          <FaBarsStaggered
            className="sm:hidden cursor-pointer text-yellow-500"
            size="1.5em"
            onClick={handleMenu}
          />
        </div>
        <div
          className={`searchInput absolute bg-green-300/15 ${
            searchToggle ? "top-18" : "-top-20"
          } w-full left-0 right-0 flex flex-col items-center justify-center p-3 transition-all text-white font-poppins backdrop-blur-lg`}
        >
          <input
            type="text"
            name=""
            id=""
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-white/10 outline-0 border border-white/20 py-2 px-4 h-full w-full rounded-md"
          />
          <div className="items flex flex-col w-full gap-2 mt-2">
            {searchProd &&
              searchToggle &&
              searchProd.map((item) => {
                return (
                  <Link
                    to={item.name ? `/products/${item._id}` : `/blogs/${item._id}`}
                    onClick={toggleSearch}
                  >
                    <div
                      className={`flex flex-row p-3 border-2 border-white/20 rounded-md ${
                        item.name ? "bg-green-700/30" : "bg-gray-500/30"
                      } hover:scale-95 transition duration-300`}
                    >
                      <div className="info">
                        <p className="font-bold">{item.title ? item.title : item.name}</p>
                        <p className="">
                          {item.salePrice
                            ? `Rs.${item.salePrice}`
                            : `${item.description.slice(0, 35)}...`}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
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
            <ListItem title="Blogs" Icon={IoReaderOutline} link="/blogs" />
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
        <ul className=" px-2 justify-center font-poppins flex-row gap-3 text-white text-xl items-center hidden sm:flex md:w-1/2">
          <li className="hover:font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:font-bold">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:font-bold">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:font-bold">
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="hover:font-bold">
            {user ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/login" className="bg-yellow-600 p-2 px-5 rounded-sm font-semibold">
                Login
              </Link>
            )}
          </li>
        </ul>
        <div className="hidden md:flex flex-row flex-wrap relative min-w-4/10 px-2">
          <input
            type="text"
            name=""
            id=""
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products or blogs"
            className=" text-white bg-white/10 outline-0 border-2 border-white/50 py-2 px-4 h-full w-full grow rounded-md"
          />
          <div
            className={`bg-black/40 ${
              searchInput ? "flex" : "hidden"
            } backdrop-blur-lg rounded-md p-2 text-white top-10 absolute items flex-col w-full gap-2 mt-2`}
          >
            {searchProd &&
              searchProd.map((item) => {
                return (
                  <Link
                    to={item.name ? `/products/${item._id}` : `/blogs/${item._id}`}
                    onClick={toggleSearch}
                  >
                    <div
                      className={`flex flex-row p-3 border-2 border-white/20 rounded-md ${
                        item.name ? "bg-green-700/30" : "bg-gray-500/30"
                      } hover:scale-95 transition duration-300`}
                    >
                      <div className="info">
                        <p className="font-bold">{item.title ? item.title : item.name}</p>
                        <p className="">
                          {item.salePrice
                            ? `Rs.${item.salePrice}`
                            : `${item.description.slice(0, 35)}...`}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="hidden sm:flex flex-row items-center gap-5 md:w-[calc(5%)] md:justify-center">
          <FaMagnifyingGlass
            size="1.3em"
            className="text-yellow-500 cursor-pointer hidden sm:flex md:hidden"
            onClick={() => setSearchToggle(!searchToggle)}
          />
          <Link to="tel:+977 9847440395">
            <IoCallOutline size="1.5em" className="text-yellow-400 hidden sm:block" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
