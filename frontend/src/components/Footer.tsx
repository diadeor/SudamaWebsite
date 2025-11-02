import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black/80 p-5 pb-0 backdrop-blur-xs flex flex-col justify-center items-center">
      <div className="site-info flex flex-col items-center justify-center mb-5">
        <img src={logo} alt="" className="w-15" />
        <p className="font-bold text-2xl font-lobster tracking-wide text-green-300">
          Sudama Plant Store
        </p>
      </div>
      <div className="font-fauna contact flex flex-col text-center items-center ">
        <p className="font-black text-yellow-500 text-xl">Contact Us</p>
        <p className="text-white">+977 9847440395</p>
        <p className="text-white">gairesanjay70@gmail.com</p>
        <p className="text-white">Kalika Chowk, Butwal</p>
      </div>
      <p className=" rounded-full text-white font-jetbrains m-5 p- w-full text-center bg-white/20">
        Copyright &copy; 2025
        <br />
        <span className="font-bold">Sudama Plant Store</span>
      </p>
    </footer>
  );
};

export default Footer;
