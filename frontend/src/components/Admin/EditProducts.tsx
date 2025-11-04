import { FormInput, FormLabel } from "../Form";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import usePut from "../../hooks/usePut";

const EditProducts = () => {
  const form = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [thumbText, setThumbText] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(Object);
  const [catOptions, setCatOptions] = useState<Array<string>>([]);
  const { id } = useParams();
  const getProduct = useFetch(`/api/v1/products/${id}`);
  const request = usePut(`/api/v1/products/update/${id}`);
  const getCategories = useFetch("/api/v1/categories");

  useEffect(() => {
    const fetchVals = async () => {
      const { data, error } = await getProduct();
      const { data: cats, error: err } = await getCategories();
      data ? setProduct(data.product) : setError(error);
      if (err) {
        setError("Error fetching categories");
        setSuccess("");
      } else {
        const categories = cats.categories.map((item: any) => item.name);
        setCatOptions(categories);
      }
    };
    fetchVals();
  }, []);

  const imagePath = product && `http://localhost:5000/${product.thumbnail}`;

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
    <div className="edit">
      <p className="title text-green-500 font-bold text-2xl">Edit product</p>
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
        <FormInput type="text" name="name" value={product.name} />
        <FormLabel name="price" labelFor="salePrice" />
        <FormInput type="number" name="salePrice" value={product.salePrice} />
        <FormLabel name="Regular Price" req={false} labelFor="regularPrice" />
        <FormInput type="number" req={false} name="regularPrice" value={product.regularPrice} />
        <FormLabel name="stock" />
        <FormInput type="number" name="stock" value={product.stock} />
        <FormLabel name="category" />
        <select
          name="category"
          id="category"
          defaultValue={product.category}
          className="font-lobster tracking-widest bg-white/10 p-2 text-white min-h-12 pr-5 outline-0 rounded-md border border-white/10 focus:bg-black/50 mb-5"
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
          defaultValue={product.badge}
          className="font-lobster tracking-widest bg-white/10 p-2 text-white min-h-12 pr-5 outline-0 rounded-md border border-white/10 focus:bg-black/50 mb-5"
        >
          <option value="sale">On Sale</option>
          <option value="featured">Featured</option>
          <option value="new">New</option>
        </select>
        <label htmlFor="description" className="text-white pb-2">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          defaultValue={product.description}
          className="p-2 outline-0 text-white border border-white/10 bg-white/10 rounded-lg mb-5"
        ></textarea>
        <input
          type="submit"
          value="Save"
          className="bg-green-600 p-2 text-white font-bold tracking-wide rounded-full min-h-10 hover:bg-green-900 cursor-pointer transition duration-300"
        />
      </form>
    </div>
  );
};

export default EditProducts;
