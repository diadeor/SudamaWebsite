import { useEffect, useState } from "react";
import Section from "./Sections";
import useFetch from "../hooks/useFetch";
import Category from "./Category";
import { Link } from "react-router-dom";
import { baseUrl } from "../contexts/AuthContext";

type Cat = {
  name: string;
  thumbnail: string;
};

const ShopByCat = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<any>();
  const [err, setErr] = useState("");
  const request = useFetch(`${baseUrl}/categories`);
  useEffect(() => {
    request().then(({ data, error }) => {
      data ? setData(data.categories) : setErr(error);
    });
  }, []);
  return (
    <Section title="Categories" subtitle="Select any category to shop">
      {err && <p>There's an error</p>}
      {data &&
        data.map((cat: Cat, index: number) => {
          const { name, thumbnail } = cat;
          return (
            index < limit && (
              <Link to="/shop" key={index}>
                <Category name={name} img={thumbnail} />
              </Link>
            )
          );
        })}
    </Section>
  );
};

export default ShopByCat;
