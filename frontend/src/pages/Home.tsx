import home from "../assets/home.png";
import Popular from "../components/Popular";
// import floral from "../assets/floral.png";
const Home = () => {
  // console.log(floral);
  return (
    <>
      <main
        className={`hero-section h-[calc(100vh-70px)] flex flex-row flex-wrap items-center justify-between pl-10 pr-10 bg-green-700`}
      >
        <div className="text w-[50%]">
          <p className="hero font-bold text-white text-[3em] mb-5">
            <span className="text-yellow-600">Plants&nbsp;</span> make&nbsp; a<br />
            <span className="text-yellow-600">positive&nbsp;</span> impact&nbsp; on
            <br />
            your&nbsp; <span className="text-yellow-600">environment</span>
          </p>
          <p className="sub-title text-white font-[500] tracking-wide">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, error odio, rerum
            earum illo voluptatum recusandae a voluptatem delectus, rem magni sunt voluptatibus nam
            id nihil corporis pariatur sequi! Delectus!
          </p>

          <button className="shop bg-yellow-600 text-white p-3 pr-6 pl-6 rounded-lg font-[600] mt-10 tracking-wide">
            Shop Now
          </button>
        </div>
        <div className="image w-[40%] text-center flex flex-row justify-center">
          <img src={home} alt="" className="" />
        </div>
      </main>
      <Popular />
    </>
  );
};

export default Home;
