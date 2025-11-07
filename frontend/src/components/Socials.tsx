import Section from "./Sections";
import { FaFacebook, FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { IoLogoTiktok, IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";

const Socials = () => {
  return (
    <Section title="Our Socials" subtitle="You can connect with us through these apps anytime">
      <FaFacebook size="2em" />
      <IoLogoInstagram size="2em" />
      <IoLogoTiktok size="2em" />
    </Section>
  );
};

export default Socials;
