import { FormInput, FormLabel } from "../Form";
import { useEffect, useRef, useState } from "react";
import usePost from "../../hooks/usePost";
import useFile from "../../hooks/useFile";
import useFetch from "../../hooks/useFetch";

const Create = () => {
  const form = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [thumbText, setThumbText] = useState("Choose a thumbnail");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [catOptions, setCatOptions] = useState<Array<string>>([]);
  const file = useFile(setThumbText);
  const request = usePost("/api/v1/products/create");
  const catRequest = useFetch("/api/v1/categories");

  useEffect(() => {
    (async () => {
      const { data, error } = await catRequest();
      if (error) {
        setError("Could not fetch categories");
        setSuccess("");
      } else {
        const cats = data.categories.map((item: any) => item.name);
        setCatOptions(cats);
      }
    })();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const { data, error } = await request(formData);
    if (error) {
      setError(error);
      setSuccess("");
    } else {
      setError("");
      setSuccess(data.message);
    }
  };
  return (
    <div className="create font-lobster tracking-widest">
      <p className="title text-green-500 font-bold text-2xl">Create New Product</p>
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
          <img src={undefined} alt="" ref={imageRef} className="w-70 rounded-xl max-h-70" />
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          onChange={(e) => file(e, imageRef)}
          className="bg-white/10 p-10 rounded-lg text-white text-center cursor-pointer mb-5 hidden"
        />
        <FormLabel name="name" />
        <FormInput type="text" name="name" />
        <FormLabel name="price" labelFor="salePrice" />
        <FormInput type="number" name="salePrice" />
        <FormLabel name="Regular Price" req={false} labelFor="regularPrice" />
        <FormInput type="number" req={false} name="regularPrice" />
        <FormLabel name="stock" />
        <FormInput type="number" name="stock" />
        <FormLabel name="category" />
        <select
          name="category"
          id="category"
          className="bg-white/10 p-2 text-white min-h-12 pr-5 outline-0 rounded-md border border-white/10 focus:bg-black/50 mb-5"
        >
          {catOptions.map((cat, index) => {
            return (
              <option value={cat} key={index}>
                {cat}
              </option>
            );
          })}
        </select>
        <FormLabel name="badge" />
        <select
          name="badge"
          id="badge"
          className="bg-white/10 p-2 text-white min-h-12 pr-5 outline-0 rounded-md border border-white/10 focus:bg-black/50 mb-5"
        >
          <option value="Sale">On Sale</option>
          <option value="Featured">Featured</option>
          <option value="New">New</option>
        </select>
        <label htmlFor="description" className="text-white pb-2">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          className="font-fauna p-2 outline-0 text-white border border-white/10 bg-white/10 rounded-lg mb-5"
        ></textarea>
        <input
          type="submit"
          value="Create"
          className="text-xl bg-green-600 p-2 text-white font-bold rounded-full min-h-10 hover:bg-green-900 cursor-pointer transition duration-300"
        />
      </form>
    </div>
  );
};

export default Create;
