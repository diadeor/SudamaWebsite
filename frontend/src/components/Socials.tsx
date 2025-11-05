import Section from "./Sections";
import { FaFacebook, FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const Socials = () => {
  return (
    <Section title="Our Socials" subtitle="You can connect with us through these apps anytime">
      <p className="facebook bg-white/10 backdrop-blur-lg flex flex-row items-center p-3 gap-2 rounded-md">
        <FaFacebook className="text-blue-500" size="2em" />
        <span className="text-xl font-bold tracking-wide font-fauna">Facebook</span>
      </p>
      <p className="tiktok bg-white/10 backdrop-blur-lg flex flex-row items-center p-3 gap-2 rounded-md">
        <FaTiktok className="text-black" size="2em" />
        <span className="text-xl font-bold tracking-wide font-fauna">Tiktok</span>
      </p>
      <p className="facebook bg-white/10 backdrop-blur-lg flex flex-row items-center p-3 gap-2 rounded-md">
        <FaInstagram className="text-blue-500" size="2em" />
        <span className="text-xl font-bold tracking-wide font-fauna">Instagram</span>
      </p>
    </Section>
  );
};

export default Socials;
