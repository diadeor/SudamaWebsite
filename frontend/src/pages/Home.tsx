import home from "../assets/home.png";
import FindUs from "../components/FindUs";
import HomeShop from "../components/HomeShop";
import New from "../components/New";
import Popular from "../components/Popular";
import ShopByCat from "../components/ShopByCat";
import Socials from "../components/Socials";
// import floral from "../assets/floral.png";
import { Link } from "react-router-dom";

const Home = () => {
  // console.log(floral);
  return (
    <>
      <main
        className={`w-full max-w-7xl hero-section h-screen flex flex-row flex-wrap justify-center wrap-normal p-5 md:items-center `}
      >
        <div className="text w-full md:max-w-[50%]">
          <p className="hero font-bold text-white text-4xl mb-5 font-lobster tracking-wider grow md:text-4xl lg:text-6xl">
            <span className="text-yellow-500">Plants&nbsp;</span> make&nbsp; a<br />
            <span className="text-yellow-500">positive&nbsp;</span> impact&nbsp; on
            <br />
            your&nbsp; <span className="text-yellow-500">environment</span>
          </p>
          <p className="sub-title text-white font-medium tracking-wide font-fauna">
            We are here for learning your culture and something else but also for the love of plants
            with me saying that the average user does not care about fonts although it would be nice
            for me to find a good font
          </p>

          <Link to="/shop">
            <button className="cursor-pointer hover:scale-95 transition shop bg-yellow-600 text-white p-3 pr-6 pl-6 rounded-md font-semibold mt-10 tracking-wide font-fauna">
              Shop Now
            </button>
          </Link>
        </div>
        <div className=" w-full max-w-md md:max-w-[50%] image text-center flex flex-row justify-center items-center">
          <img src={home} alt="" className="" />
        </div>
      </main>
      <ShopByCat limit={4} />
      <Popular limit={6} />
      <New limit={6} />
      <HomeShop limit={6} />
      <FindUs />
    </>
  );
};

export default Home;
