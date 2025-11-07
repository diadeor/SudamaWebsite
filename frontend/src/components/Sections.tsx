import type { ReactNode } from "react";

const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => {
  return (
    <section className="ind-section max-w-6xl font-fauna section-boiler p-5 pb-20 pt-0 text-white w-full">
      <p className="font-lobster sec-title text-yellow-500 text-4xl text-center font-bold tracking-wider">
        {title}
      </p>
      <p className="s6 subtitle text-center font-poppins tracking-wider">{subtitle}</p>
      <div className="products flex flex-row gap-3 pt-10 flex-wrap justify-center">{children}</div>
    </section>
  );
};

export default Section;
