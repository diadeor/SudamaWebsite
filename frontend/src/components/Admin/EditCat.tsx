import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FormInput, FormLabel } from "../Form";
import useFetch from "../../hooks/useFetch";
import usePut from "../../hooks/usePut";

type Category = {
  id: string;
  name: string;
  thumbnail: string;
};

const EditCat = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [thumbText, setThumbText] = useState("");
  const [category, setCategory] = useState<Category>();
  const imageRef = useRef<HTMLImageElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const getCat = useFetch(`/api/v1/categories/${id}`);
  const setCat = usePut(`/api/v1/categories/update/${id}`);

  useEffect(() => {
    try {
      const fetchCategory = async () => {
        const { data } = await getCat();
        if (data.success) {
          setCategory(data.category);
          console.log(data);
        }
      };
      fetchCategory();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const { data, error } = await setCat(formData);
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
  const imagePath = category && `http://localhost:5000/${category.thumbnail}`;

  return (
    <div className="edit">
      <p className="font-lobster title text-green-500 font-bold text-2xl">Edit Category</p>
      {(error || success) && (
        <p
          className={`message ${
            error ? "bg-red-900" : "bg-green-500"
          } p-1 text-center text-white font-bold tracking-wider rounded-full mt-2 `}
        >
          {error || success}
        </p>
      )}
      <div className="second flex flex-col mt-5 gap-3">
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
            <img src={imagePath} alt="" ref={imageRef} className="w-70 rounded-xl max-h-70" />
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
          <FormInput type="text" name="name" value={category?.name} />
          <input
            type="submit"
            value="Update"
            className="font-poppins bg-green-600 p-2 text-white font-bold tracking-wide rounded-full min-h-10 hover:bg-green-900 cursor-pointer transition duration-300"
          />
        </form>
      </div>
    </div>
  );
};

export default EditCat;
