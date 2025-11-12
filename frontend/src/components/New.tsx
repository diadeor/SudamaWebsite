import Section from "./Sections";
import Product from "./Product";
import { useItem } from "../contexts/ItemContext";

const New = ({ limit }: { limit: number }) => {
  const { products } = useItem();

  const data = products.filter((prod: any) => {
    return prod.badge === "new";
  });
  return (
    <Section title="New Arrivals" subtitle="Here are the latest items">
      {data &&
        data.map((pd: Object, index: number) => {
          return index < limit && <Product pd={pd} key={index} />;
        })}
    </Section>
  );
};

export default New;
