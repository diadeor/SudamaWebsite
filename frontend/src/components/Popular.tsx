import Product from "./Product";
import dummy from "../assets/dummy1.png";
// import dummy2 from "../assets/dummy2.png";
// import dummy3 from "../assets/dummy3.png";
// import dummy4 from "../assets/dummy4.png";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

type product = {
  _id: string;
  salePrice: number;
  regularPrice: number;
  name: string;
};

const Popular = () => {
  const [data, setData] = useState<any>();
  const [err, setErr] = useState("");
  const request = useFetch("/api/v1/products");
  useEffect(() => {
    request().then(({ data, error }) => {
      data ? setData(data.products) : setErr(error);
    });
  }, []);

  return (
    <section className="popular bg-green-950 pt-5 pl-10 pr-10 pb-20">
      <p className="sec-title text-yellow-600 text-4xl text-center font-bold tracking-wider">
        Popular
      </p>
      <div className="products flex flex-row gap-5 pt-10 flex-wrap justify-center">
        {data &&
          data.map((el: product, index: number) => {
            return (
              <Product
                key={index}
                id={el._id}
                image={dummy}
                price={el.salePrice}
                regularPrice={el.regularPrice}
                name={el.name}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Popular;
