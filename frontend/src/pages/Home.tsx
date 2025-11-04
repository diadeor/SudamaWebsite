import home from "../assets/home.png";
import FindUs from "../components/FindUs";
import HomeShop from "../components/HomeShop";
import New from "../components/New";
import Popular from "../components/Popular";
import ShopByCat from "../components/ShopByCat";
import Socials from "../components/Socials";
// import floral from "../assets/floral.png";
const Home = () => {
  // console.log(floral);
  return (
    <>
      <main
        className={` hero-section h-screen flex flex-row flex-wrap justify-center wrap-normal pl-5 pr-5 pt-5`}
      >
        <div className="text">
          <p className="hero font-bold text-white text-4xl mb-5 font-lobster tracking-wider">
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

          <button className="shop bg-yellow-600 text-white p-3 pr-6 pl-6 rounded-md font-semibold mt-10 tracking-wide font-fauna">
            Shop Now
          </button>
        </div>
        <div className="image text-center flex flex-row justify-center items-center">
          <img src={home} alt="" className="" />
        </div>
      </main>
      <ShopByCat />
      <Popular />
      <New />
      <HomeShop />
      <FindUs />
      <Socials />
    </>
  );
};

export default Home;
