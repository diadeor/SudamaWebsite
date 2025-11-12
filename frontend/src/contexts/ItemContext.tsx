import { useContext, createContext, useEffect, useState, type ReactNode } from "react";
import useFetch from "../hooks/useFetch";

const ItemContext: any = createContext("");

export const useItem: any = () => useContext(ItemContext);

type Product = {
  _id: string;
  salePrice: number;
  regularPrice: number;
  name: string;
  category: string;
  thumbnail: string;
  badge: string;
};

type Blog = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  updatedAt: string;
};

const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Array<Product>>();
  const [blogs, setBlogs] = useState<Array<Blog>>();
  const [loading, setLoading] = useState<Boolean>(true);
  const prodRequest = useFetch("/api/v1/products");
  const blogRequest = useFetch("/api/v1/blogs");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await prodRequest();
        const { data: blogData, error: blogErr } = await blogRequest();
        if (!error) setProducts(data.products);
        if (!blogErr) setBlogs(blogData.blogs);
      } catch (error) {
        setProducts(undefined);
        setBlogs(undefined);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{ products, blogs }}>{!loading && children}</ItemContext.Provider>
  );
};

export default ItemProvider;
