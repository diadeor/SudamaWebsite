import { FormInput, FormLabel } from "../Form";
import { useRef, useState } from "react";
import usePost from "../../hooks/usePost";

const Create = () => {
  const form = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [thumbText, setThumbText] = useState("Choose a thumbnail");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // console.log(imageRef);
  const request = usePost("/api/v1/products/create");

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
      console.log(data);
      setSuccess(data.message);
    }
  };
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        imageRef.current && imageRef.current.setAttribute("src", e.target.result);
        setThumbText("");
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="create">
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
          className="text-white mt-2 mb-4 cursor-pointer p-2 bg-white/10 text-center min-h-20 flex flex-col justify-center items-center rounded-xl font-bold tracking-wide"
        >
          {thumbText}
          <img src={undefined} alt="" ref={imageRef} className="w-70 rounded-xl max-h-70" />
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          onChange={(e) => handleFile(e)}
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
          className="bg-white/10 p-2 text-white min-h-12 pr-5 outline-0 rounded-md border-1 border-white/10 focus:bg-black/50 mb-5"
        >
          <option value="Indoor" className="bg-black/70">
            Indoor
          </option>
          <option value="Outdoor">Outdoor</option>
          <option value="Fruits">Fruits</option>
        </select>
        <label htmlFor="description" className="text-white pb-2">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          className="p-2 outline-0 text-white border-1 border-white/10 bg-white/10 rounded-lg mb-5"
        ></textarea>
        <input
          type="submit"
          value="Create"
          className="bg-green-600 p-2 text-white font-bold tracking-wide rounded-full min-h-10 hover:bg-green-900 cursor-pointer transition duration-300"
        />
      </form>
    </div>
  );
};

export default Create;
