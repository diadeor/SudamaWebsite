import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className=" bg-black/30 backdrop-blur-xs flex flex-col items-center justify-center">
      <div className="inner-footer w-full max-w-6xl flex flex-col items-center justify-center pt-5 md:flex-row">
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
      </div>
      <p className="text-sm text-white font-poppins tracking-wide mt-3 w-full text-center">
        &copy; 2024 Sudama Plant Store. All rights reserved
        <br />
      </p>
    </footer>
  );
};

export default Footer;
