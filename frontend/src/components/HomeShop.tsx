import Section from "./Sections";
import { useItem } from "../contexts/ItemContext";
import Product from "./Product";

const HomeShop = ({ limit }: { limit: number }) => {
  const { products } = useItem();
  return (
    <Section title="Shop" subtitle="Here are our other items">
      {products &&
        products.map((pd: Object, index: number) => {
          return index < limit && <Product pd={pd} key={index} />;
        })}
    </Section>
  );
};

export default HomeShop;
