import { useState, useEffect } from "react";
import Category from "../components/Category";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Product from "../components/Product";
import Top from "../components/Top";

const Shop = () => {
  const [cat, setCat] = useState<Array<Object>>([]);
  const [products, setProducts] = useState<Array<Object>>([]);
  const [searchProd, setSearchProd] = useState<Array<Object>>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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

        if (data.success) {
          setProducts(data.products);
          setSearchProd(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const filteredProducts = products.filter((prod) => {
      const term = search.toLowerCase();
      const names = prod.name.toLowerCase().split(" ");
      const slicedArray = names.map((name: string) => {
        const sliced = name.slice(0, search.length);
        return sliced == term ? sliced : false;
      });
      return slicedArray.indexOf(term) == -1 ? false : true;
    });
    setSearchProd(filteredProducts);
  }, [search]);

  return (
    <div className="w-full font-lobster cat-shop-container p-5 flex flex-col items-center min-h-svh pb-15 text-white max-w-6xl">
      <Top title="Shop" subtitle="Choose any category to see items in that respective category" />
      <div className="categories flex flex-row flex-wrap items-center justify-center gap-3 mb-10">
        <Category name="All" setName={setSelectedCategory} img="null" />
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="font-fauna h-12 w-full bg-white/20 placeholder:text-gray-100 border border-white/20 pl-4 rounded-md mb-5 placeholder:text-lg tracking-wide outline-0"
      />
      <div className="products-by-cat flex flex-row flex-wrap items-center justify-center gap-3">
        {searchProd &&
          searchProd.map((item, index) => {
            return <Product pd={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Shop;
