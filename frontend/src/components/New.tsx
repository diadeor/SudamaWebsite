import { useEffect, useState } from "react";
import Section from "./Sections";
import useFetch from "../hooks/useFetch";
import Product from "./Product";

const New = () => {
  const [data, setData] = useState<any>();
  const [err, setErr] = useState("");
  const request = useFetch("/api/v1/products/New");
  useEffect(() => {
    request().then(({ data, error }) => {
      data ? setData(data.products) : setErr(error);
    });
  }, []);
  return (
    <Section title="New Arrivals" subtitle="Here are the latest items">
      {data &&
        data.map((pd: Object, index: number) => {
          return <Product pd={pd} key={index} />;
        })}
    </Section>
  );
};

export default New;
