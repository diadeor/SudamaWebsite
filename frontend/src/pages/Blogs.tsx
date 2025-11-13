import Top from "../components/Top";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useItem } from "../contexts/ItemContext";

type Blog = {
  _id: string;
  title: string;
  updatedAt: string;
  description: string;
};
const Blogs = () => {
  const { blogs } = useItem();
  const [search, setSearch] = useState("");
  const [filterBlogs, setFilterBlogs] = useState<Array<Blog>>(blogs);

  useEffect(() => {
    const filteredBlogs = blogs.filter((blog: { title: string }) =>
      blog.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilterBlogs(filteredBlogs);
  }, [search]);

  return (
    <div className="blog-container w-full max-w-6xl flex flex-col min-h-[calc(100svh-70px)] p-5">
      <Top title="Blogs" subtitle="Latest blogs for you to read" />
      <input
        type="text"
        name="search"
        id=""
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for blogs"
        className="w-full bg-white/10 border border-white/20 p-2 pl-4 h-12 text-white outline-0 rounded-md"
      />
      <div className="blogs flex flex-col gap-3 mt-5">
        {filterBlogs &&
          filterBlogs.map((blog, index) => {
            const updated = new Date(blog.updatedAt);
            const time = updated.toLocaleDateString("default", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            const desc = blog.description;
            const title = blog.title;
            const titleUpdated = `${title.slice(0, 40)}${title.length >= 40 ? "..." : ""}`;
            const description = `${desc.slice(0, 100)}${desc.length >= 100 ? "..." : ""}`;
            return (
              <Link to={`/blogs/${blog._id}`} key={index}>
                <div className="bg-black/60 backdrop-blur-lg p-3 rounded-md text-white">
                  <p className="text-yellow-500 font-bold font-poppins text-xl">{titleUpdated}</p>
                  <p className="font-fauna text-sm">{description}</p>
                  <p className="text-sm font-poppins text-right">{time}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
