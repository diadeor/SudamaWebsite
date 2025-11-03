import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

const Ret = ({ title, value }: { title: string; value: any }) => {
  return (
    <p className="font-fauna tracking-wide stock bg-white/15 p-2 font-bold text-center rounded-md min-w-20 text-yellow-500 grow">
      {title} <br /> <span className="font-bold text-white font-jetbrains">{value}</span>
    </p>
  );
};
const ActionButton = ({
  children,
  onclick,
  bg,
}: {
  children: any;
  onclick?: Function;
  bg: string;
}) => {
  return (
    <button
      onClick={onclick ? (e) => onclick(e) : undefined}
      className={`edit bg-${bg}-500 min-h-11 min-w-14 flex items-center justify-center rounded-lg cursor-pointer hover:border-2 duration-200 transition hover:scale-110`}
    >
      {children}
    </button>
  );
};
type Pd = {
  _id: string;
  stock: number;
  salePrice: number;
  regularPrice: number;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
};

export const ProductsCard = ({ product }: { product: Pd }) => {
  const imagePath = `http://localhost:5000/${product.thumbnail}`;
  const handleDelete = () => {
    const firstConfirmation = prompt(
      `Do you really want to delete ${product.name} from products ?\n\nType "yes" if you are sure`,
    );
    if (firstConfirmation?.toLowerCase() != "yes") return;
    const secondConfirmation = confirm(`Are you certain about this ? `);
    if (!secondConfirmation) return;
    if (firstConfirmation && secondConfirmation) {
      axios
        .delete(`/api/v1/products/${product._id}`)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));

      alert("Product deletion complete");
    }
  };
  return (
    <div className="font-fauna item bg-white/20 flex flex-row justify-between p-2 pl-4 rounded-lg text-white gap-3">
      <div className="product-image max-w-[30%] min-w-auto flex flex-row items-center">
        <img src={imagePath} alt="" className="w-30 h-30 rounded-xl" />
      </div>
      <div className="details min-w-[50%] grow">
        <p className="name text-yellow-600 font-bold text-xl">{product.name}</p>
        <p className="desc">{product.description}</p>
        <div className="more-details flex flex-row flex-wrap gap-2 mt-2 mb-1 ">
          <Ret title="Stock" value={product.stock} />
          <Ret title="Cat" value={product.category} />
          <Ret title="Price" value={product.regularPrice} />
          <Ret title="Sale" value={product.salePrice} />
        </div>
      </div>
      <div className="action flex flex-col items-end justify-center gap-2 pr-2">
        <Link to={`/admin/products/edit/${product._id}`}>
          <ActionButton bg="green">
            <FaPenToSquare className="regular" color="white" size="1.2em" />
          </ActionButton>
        </Link>
        <ActionButton onclick={handleDelete} bg="red">
          <IoTrashOutline className="regular" color="white" size="1.5em" />
        </ActionButton>
      </div>
    </div>
  );
};

export const UserCard = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="item bg-white/20 flex flex-row p-3 rounded-lg text-white">
      <div className="details">
        <p className="name text-yellow-500 font-poppins tracking-wider font-bold text-xl">{name}</p>
        <p className="desc font-fauna">{email}</p>
      </div>
      <div className="actions"></div>
    </div>
  );
};

type order = {
  tx: string;
  user: string;
  email: string;
  amount: number;
  status: string;
  paymentStatus: string;
  items: Array<Object>;
};

type OrderItem = {
  name: string;
  price: number;
  subTotal: number;
  quantity: number;
};

export const OrderCard = ({ cart, item }: { cart: order; item: Array<OrderItem> }) => {
  // console.log(cart.items);
  return (
    <Link to={`/admin/orders/edit/${cart.tx}`}>
      <div className=" item bg-white/20 flex flex-col gap-2 p-2 pl-3 pr-3 rounded-lg text-white hover:scale-95 transition duration-300">
        <div className="details w-full flex flex-row">
          <div className="name-detail min-w-60">
            <p className="tx font-bold text-yellow-500 text-xl font-jetbrains">#{cart.tx}</p>
            <p className="name text-white text-md font-fauna">{cart.user}</p>
            <p className="desc text-sm font-fauna">{cart.email}</p>
          </div>

          <div className="items flex-col bg-white/15 w-full m-1 rounded-md p-3 pt-1 hidden md:flex">
            <p className="font-lobster text-yellow-400 text-center font-bold uppercase border-b-2 border-white/40 tracking-widest">
              Items
            </p>
            {item &&
              item.map((element, index) => {
                // console.log(cart);
                return (
                  <p
                    className="flex flex-row justify-between items-center font-jetbrains"
                    key={index}
                  >
                    <span className="font-bold min-w-55">{element.name}</span>
                    <span className=" min-w-15 text-center">{element.quantity}</span>
                    <span className="min-w-25 text-center">{element.subTotal}</span>
                  </p>
                );
              })}
          </div>
        </div>
        <div className="more-details flex flex-row gap-2 mb-1">
          <Ret title="Total" value={cart.amount} />
          <Ret title="Status" value={cart.status} />
          <Ret title="Payment" value={cart.paymentStatus} />
        </div>
      </div>
    </Link>
  );
};
type Blog = {
  thumbnail: string;
  title: string;
  description: string;
};

export const BlogCard = ({ blog }: { blog: Blog }) => {
  const imageSrc = `http://localhost:5000/${blog.thumbnail}`;
  return (
    <div className="bg-white/20 flex flex-row gap-4 p-4 rounded-lg text-white hover:scale-95 transition duration-300">
      <img src={imageSrc} alt="" className="min-w-30 w-30 h-30 rounded-xl" />
      <div className="right flex flex-col flex-wrap">
        <p className="title font-bold text-xl wrap-normal font-poppins">{blog.title}</p>
        <p className="desc font-fauna">{blog.description}</p>
      </div>
    </div>
  );
};

export const CategoryCard = ({ name, thumbnail }: { name: string; thumbnail: Object }) => {
  return (
    <div className=" bg-white/20 flex flex-row gap-4 p-3 rounded-lg text-white hover:scale-95 transition duration-300">
      <img
        src={`http://localhost:5000/${thumbnail}`}
        alt=""
        className="min-w-15 w-15 h-15 rounded-xl bg-white"
      />
      <p className="title font-bold text-md wrap-normal font-poppins">{name}</p>
    </div>
  );
};
