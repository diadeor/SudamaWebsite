import usePost from "../../hooks/usePost";
import { useRef, useState } from "react";
import { FormInput, FormLabel } from "../Form";
import useFile from "../../hooks/useFile";

const CreateCategory = () => {
  const form = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [thumbText, setThumbText] = useState("Choose a thumbnail");
  const imageRef = useRef<HTMLImageElement>(null);
  const file = useFile(setThumbText);
  const request = usePost("/api/v1/categories/create");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const { data, error } = await request(formData);
    if (error) {
      setError(error);
      setSuccess("");
    } else {
      setSuccess(data.message);
      setError("");
    }
  };
  return (
    <div className=" container">
      <p className="font-lobster tracking-widest title text-green-500 font-bold text-2xl">
        Create New Category
      </p>
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
        id="create-cat"
        ref={form}
        encType="multipart/form-data"
      >
        <label
          htmlFor="thumbnail"
          className="text-xl font-lobster text-white mt-2 mb-4 cursor-pointer p-2 bg-white/10 text-center min-h-20 flex flex-col justify-center items-center rounded-xl font-bold tracking-wider"
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
        <input
          type="submit"
          value="Create"
          className="font-lobster text-xl tracking-widest outline-0 bg-green-600 p-2 text-white font-bold rounded-full min-h-10 hover:bg-green-900 cursor-pointer transition duration-300"
        />
      </form>
    </div>
  );
};

export default CreateCategory;
