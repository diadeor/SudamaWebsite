import { useEffect, useState } from "react";
import Section from "./Sections";
import useFetch from "../hooks/useFetch";
import Category from "./Category";
import { Link } from "react-router-dom";

type Cat = {
  name: string;
  thumbnail: string;
};

const ShopByCat = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<any>();
  const [err, setErr] = useState("");
  const request = useFetch("/api/v1/categories");
  useEffect(() => {
    request().then(({ data, error }) => {
      data ? setData(data.categories) : setErr(error);
    });
  }, []);
  return (
    <Section title="Categories" subtitle="Select any category to shop">
      {data &&
        data.map((cat: Cat, index: number) => {
          return (
            index < limit && (
              <Link to="/shop" key={index}>
                <Category name={cat.name} img={`http://localhost:5000/${cat.thumbnail}`} />
              </Link>
            )
          );
        })}
    </Section>
  );
};

export default ShopByCat;
