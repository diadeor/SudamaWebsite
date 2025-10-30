import { FaPenToSquare, FaTrash } from "react-icons/fa6";
const Ret = ({ title, value }: { title: string; value: any }) => {
  return (
    <p className="stock bg-white/15 p-2 font-bold text-center rounded-md min-w-20 text-yellow-500">
      {title} <br /> <span className="font-bold text-white">{value}</span>
    </p>
  );
};
const ActionButton = ({ children }: { children: any }) => {
  return (
    <button className="edit bg-yellow-600 min-h-11 min-w-14 flex items-center justify-center rounded-lg cursor-pointer hover:border-2 duration-200 transition hover:scale-110">
      {children}
    </button>
  );
};

export default ActionButton;
export const ProductsCard = ({
  desc,
  stock,
  category,
  regPrice,
  salePrice,
  name,
}: {
  desc: string;
  name: string;
  regPrice: number;
  salePrice: number;
  stock: number;
  category: string;
}) => {
  return (
    <div className="item bg-white/20 flex flex-row p-2 pl-4 rounded-lg text-white">
      <div className="product-image max-w-[30%] min-w-auto border-1 flex flex-row items-center mr-3">
        <img
          src="../../uploads/products/68fdd880673da00905b92031.jpg"
          alt=""
          className="w-30 h-30"
        />
      </div>
      <div className="details min-w-[50%] grow">
        <p className="name text-yellow-600 font-bold text-xl">{name}</p>
        <p className="desc">{desc}</p>
        <div className="more-details flex flex-row gap-3 mt-2 mb-1">
          <Ret title="Stock" value={stock} />
          <Ret title="Cat" value={category} />
          <Ret title="Price" value={regPrice} />
          <Ret title="Sale" value={salePrice} />
        </div>
      </div>
      <div className="action w-[20%] flex flex-col items-end justify-center gap-2 pr-2">
        <ActionButton>
          <FaPenToSquare className="regular" color="white" size="1.2em" />
        </ActionButton>
        <ActionButton>
          <FaTrash className="regular" color="white" size="1.2em" />
        </ActionButton>
      </div>
    </div>
  );
};

export const UserCard = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="item bg-white/20 flex flex-row p-2 pl-4 rounded-lg text-white">
      <div className="details">
        <p className="name text-yellow-600 font-bold text-xl">{name}</p>
        <p className="desc">{email}</p>
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
// type item = {
//   name: string;
//   quantity: number;
//   subTotal: number;
// };

export const OrderCard = ({ cart }: { cart: order; item: Array<Object> }) => {
  // console.log(cart.items);
  return (
    <div className="item bg-white/20 flex flex-row gap-3 p-2 pl-4 rounded-lg text-white hover:scale-95 transition duration-300">
      <div className="details">
        <p className="tx font-bold text-yellow-600 text-xl">#{cart.tx}</p>
        <p className="name text-white text-md">{cart.user}</p>
        <p className="desc text-sm">{cart.email}</p>
        <div className="more-details flex flex-row gap-3 mt-2 mb-1">
          <Ret title="Total" value={cart.amount} />
          <Ret title="Status" value={cart.status} />
          <Ret title="Payment" value={cart.paymentStatus} />
        </div>
      </div>
      <div className="items flex flex-col bg-white/15 w-full m-1 rounded-md p-3 pt-1">
        <p className="text-yellow-500 text-center font-bold uppercase border-b-2 border-white/40 tracking-widest">
          Items
        </p>
        {cart.items &&
          cart.items.map((element, index) => {
            // console.log(cart);
            return (
              <p className="flex flex-row justify-between items-center" key={index}>
                <span className="font-bold min-w-55">{element.name}</span>
                <span className=" min-w-15 text-center">{element.quantity}</span>
                <span className="min-w-25 text-center">{element.subTotal}</span>
              </p>
            );
          })}
      </div>
    </div>
  );
};
