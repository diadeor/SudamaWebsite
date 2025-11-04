import Product from "./Product";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Section from "./Sections";

const Popular = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<any>();
  const [err, setErr] = useState("");
  const request = useFetch("/api/v1/products/featured");
  useEffect(() => {
    request().then(({ data, error }) => {
      data ? setData(data.products) : setErr(error);
    });
  }, []);

  return (
    <Section title="Popular" subtitle="These are our most popular items">
      {data &&
        data.map((el: Object, index: number) => {
          return index < limit && <Product key={index} pd={el} />;
        })}
    </Section>
  );
};

export default Popular;
