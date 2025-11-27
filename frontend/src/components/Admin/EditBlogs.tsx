import { useRef, useState, useEffect } from "react";
import { FormLabel, FormInput } from "../Form";
import useFile from "../../hooks/useFile";
import useFetch from "../../hooks/useFetch";
import usePut from "../../hooks/usePut";
import { useParams } from "react-router-dom";

type Blog = {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
};

const EditBlogs = () => {
  const { id } = useParams();
  const form = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [blog, setBlog] = useState<Blog>();
  const [thumbText, setThumbText] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleFile = useFile(setThumbText);
  const getBlog = useFetch(`/api/v1/blogs/${id}`);
  const updateBlog = usePut(`/api/v1/blogs/update/${id}`);

  useEffect(() => {
    try {
      const fetchBlog = async () => {
        const { data, error } = await getBlog();
        if (data.success) {
          setBlog(data.blog);
        }
      };
      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const { data, error } = await updateBlog(formData);
    if (!error) {
      setSuccess(data.message);
      setError("");
    } else {
      setError(error);
      setSuccess("");
    }
  };
  const imagePath = blog && `http://localhost:5000/${blog.thumbnail}`;
  console.log(imagePath, blog);

  return (
    <div className="font-lobster create-blog flex flex-col text-white ">
      <p className="title text-green-500 font-bold text-2xl">Edit Blog</p>
      {(error || success) && (
        <p
          className={`message ${
            error ? "bg-red-900" : "bg-green-500"
          } p-1 text-center text-white font-bold tracking-wider rounded-full mt-2 `}
        >
          {error || success}
        </p>
      )}
      <form
        className="mt-2 flex flex-col justify-center"
        onSubmit={(e) => handleSubmit(e)}
        id="create-product"
        encType="multipart/form-data"
        ref={form}
      >
        <label
          htmlFor="thumbnail"
          className="text-xl text-white mt-2 mb-4 cursor-pointer p-2 bg-white/10 text-center min-h-20 flex flex-col justify-center items-center rounded-xl font-bold tracking-wider"
        >
          {thumbText}
          <img src={imagePath} alt="" ref={imageRef} className="w-70 rounded-xl max-h-70" />
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          onChange={(e) => handleFile(e, imageRef)}
          className="bg-white/10 p-10 rounded-lg text-white text-center cursor-pointer mb-5 hidden"
        />
        <FormLabel name="title" />
        <FormInput type="text" name="title" value={blog?.title} />
        <FormLabel name="description" />
        <textarea
          name="description"
          id=""
          rows={10}
          className="font-fauna bg-white/10 p-3 outline-0 border border-white/20 rounded-md mb-5"
          defaultValue={blog?.description}
        ></textarea>
        <input
          type="submit"
          value="Update"
          className="text-xl bg-green-600 p-2 text-white font-bold tracking-widest rounded-full min-h-10 hover:bg-green-900 cursor-pointer transition duration-300"
        />
      </form>
    </div>
  );
};

export default EditBlogs;
