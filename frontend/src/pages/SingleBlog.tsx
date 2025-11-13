import { useParams } from "react-router-dom";
import { useItem } from "../contexts/ItemContext";
import { useEffect, useState } from "react";

const Blog = () => {
  const { id } = useParams();
  const { blogs } = useItem();
  const [blog, setBlog] = useState<{ title: string; thumbnail: string; description: string }>();

  if (!id) return;
  const valid = id?.length > 20;

  useEffect(() => {
    if (valid) {
      const temp = blogs.find((blog: { _id: string }) => blog._id === id);
      setBlog(temp);
    }
  }, []);

  return (
    <div className="text-white font-poppins blog-container flex flex-col min-h-[calc(100svh-70px)] p-5 w-full max-w-6xl bg-neutral-800">
      {blog && (
        <div className="blog flex flex-col gap-5 items-center">
          <img
            src={`http://localhost:5000/${blog.thumbnail}`}
            alt=""
            className="w-full max-w-150 rounded-xl aspect-square"
          />
          <p className="font-bold text-xl w-full">{blog.title}</p>
          <p className=" w-full">{blog.description}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
