import { useState, useEffect } from "react";
import Category from "../components/Category";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Product from "../components/Product";

const ShopByCategory = () => {
  const [cat, setCat] = useState<Array<Object>>([]);
  const [products, setProducts] = useState<Array<Object>>([]);
  const [selectedCategory, setSelectedCategory] = useState("Sanjay Gaire");
  const catsRequest = useFetch("/api/v1/categories");
  useEffect(() => {
    catsRequest().then(({ data }) => {
      if (data.success) {
        setCat(data.categories);
      }
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        params.append("category", selectedCategory);

        const { data } = await axios(`/api/v1/products?${params}`);

        if (data.success) setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);
  console.log(selectedCategory);

  return (
    <div className="border-2 w-full font-lobster cat-shop-container p-5 flex flex-col items-center min-h-svh pt-5 pb-15 text-white max-w-6xl">
      <h2 className="title font-bold text-yellow-500 text-3xl">Shop By Category</h2>
      <p className="subtitle font-fauna mb-10 mt-1 text-center">
        Choose any category to see items in that respective category
      </p>
      <div className="categories flex flex-row flex-wrap items-center justify-center gap-3 mb-10">
        {cat &&
          cat.map((item: any, index: number) => {
            return (
              <Category
                img={`http://localhost:5000/${item.thumbnail}`}
                name={item.name}
                setName={setSelectedCategory}
                key={index}
              />
            );
          })}
      </div>
      <input
        type="text"
        name=""
        id=""
        placeholder="Search for products"
        className="font-fauna h-12 w-full bg-white/20 placeholder:text-zinc-800 border border-white/20 pl-4 rounded-md mb-5 placeholder:text-lg tracking-wide outline-0"
      />
      <div className="products-by-cat flex flex-row flex-wrap items-center justify-center gap-3">
        {products &&
          products.map((item, index) => {
            return <Product pd={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default ShopByCategory;
