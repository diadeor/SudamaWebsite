import { useState, useEffect, type ReactNode } from "react";
import useFetch from "../../hooks/useFetch";
import { BlogCard, CategoryCard, OrderCard, ProductsCard, UserCard } from "./AdminPage";

const AdminFetch = ({
  title,
  icon,
  url,
  errFunc,
  option,
}: {
  title: string;
  icon: ReactNode;
  url: string;
  errFunc: Function;
  option?: ReactNode;
}) => {
  const [data, setData] = useState(Array);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(Array);
  const request = useFetch(url);

  useEffect(() => {
    (async () => {
      const { data, error } = await request();
      if (error) {
        errFunc(error);
      } else {
        // console.log(data);
        setData(data[title]);
        setSearchData(data[title]);
      }
    })();
  }, [url]);

  useEffect(() => {
    const searchList = data.filter((el: any) => {
      const name = `${title == "orders" ? el.user : el.name}`.toLowerCase().split(" ");
      const slicedArray = name.map((el: any) => {
        const sliced: string = el.slice(0, search.length);
        return sliced == search.toLowerCase() ? sliced : false;
      });
      return slicedArray.indexOf(search.toLowerCase()) != -1 ? true : false;
      // const sliced: string = name[0].slice(0, search.length);
      // console.log(name, sliced);

      // const sliced: string = name.slice(0, search.length);
      // return sliced.toLowerCase() == search.toLowerCase();
    });
    setSearchData(searchList);
  }, [search]);

  return (
    <div className="admin-data">
      <div className="font-lobster tracking-wider title flex flex-row justify-between items-center">
        <p
          className={`font-bold text-yellow-600 text-2xl uppercase ${
            option ? "" : "mt-1"
          } flex flex-row gap-2 items-center`}
        >
          {icon}
          {title}
        </p>
        {option && option}
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${title} by name`}
        className="search h-12 w-full bg-white/10 border border-white/20 rounded-xl mt-3 pl-5 text-white placeholder:text-white/60 placeholder:tracking-wide mb-3 outline-0"
      />
      <div className={`items flex flex-col grow flex-wrap gap-2 overflow-hidden`}>
        {searchData.map((el: any, index: number) => {
          if (title == "products") {
            return <ProductsCard product={el} key={index} />;
          } else if (title == "users") {
            return <UserCard name={el.name} email={el.email} key={index} />;
          } else if (title == "orders") {
            return <OrderCard cart={el} item={el.items} key={index} />;
          } else if (title == "blogs") {
            return <BlogCard blog={el} key={index} />;
          } else if (title == "categories") {
            return <CategoryCard name={el.name} thumbnail={el.thumbnail} key={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default AdminFetch;
