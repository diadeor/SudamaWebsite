import Product from "./Product";
import Section from "./Sections";
import { useItem } from "../contexts/ItemContext";

const Popular = ({ limit }: { limit: number }) => {
  const { products } = useItem();
  const data = products.filter((prod: { badge: string }) => {
    return prod.badge === "featured";
  });

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
