import { Link } from "react-router-dom";
import logo from "../assets/Sudama.png";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  return (
    <nav className="bg-green-950 flex flex-row items-center justify-between pl-10 pr-10 h-[70px]">
      <Link to="/">
        <img src={logo} alt="" className="w-[2em]" />
      </Link>
      <ul className="flex flex-row gap-5 text-white font-bold text-lg tracking-wide items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#popular">Popular</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          {user ? (
            <Link to={user.role == "admin" ? "/admin" : "/profile"}>
              <button className="p-2 pl-4 pr-4 bg-green-600 rounded-sm cursor-pointer hover:scale-107 transition duration-200 font-[500]">
                {user.role != "admin" ? `Hi, ${user.name.split(" ")[0]}` : "Hi, admin"}
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="p-2 pl-4 pr-4 bg-yellow-600 rounded-sm cursor-pointer hover:scale-107 transition duration-200 font-[500]">
                Login
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
