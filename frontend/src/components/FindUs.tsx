import Section from "./Sections";

const FindUs = () => {
  return (
    <Section title="Meet us at" subtitle="You are welcome anytime">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322.514390094345!2d83.46299017144938!3d27.675819507025366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39968512d94beae7%3A0x609c616b5b736079!2sSudama%20Plant%20Store!5e0!3m2!1sen!2snp!4v1762191477381!5m2!1sen!2snp"
        loading="lazy"
        className="rounded-xl w-full h-60"
      ></iframe>
    </Section>
  );
};

export default FindUs;
