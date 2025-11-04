import { useEffect, useState } from "react";
import Section from "./Sections";
import useFetch from "../hooks/useFetch";
import Product from "./Product";

const HomeShop = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<any>();
  const [err, setErr] = useState("");
  const request = useFetch("/api/v1/products");
  useEffect(() => {
    request().then(({ data, error }) => {
      data ? setData(data.products) : setErr(error);
    });
  }, []);
  return (
    <Section title="Shop" subtitle="Here are our other items">
      {data &&
        data.map((pd: Object, index: number) => {
          return index < limit && <Product pd={pd} key={index} />;
        })}
    </Section>
  );
};

export default HomeShop;
