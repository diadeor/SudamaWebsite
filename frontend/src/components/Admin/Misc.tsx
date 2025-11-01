import type { ReactNode } from "react";
import { Link } from "react-router-dom";
export const AdminCard = ({
  title,
  value,
  subTitle,
  subValue,
  icon,
}: {
  title: string;
  value: number;
  subTitle: string;
  subValue: number;
  icon: ReactNode;
}) => {
  return (
    <div className="users min-w-45 bg-black/40 text-white p-4 pl-5 pr-5 rounded-xl">
      <p className="text-yellow-600 font-bold mb-2 uppercase tracking-wide flex flex-row items-center gap-2">
        {icon}
        {title}
      </p>
      <p className="font-bold text-2xl mb-2">{value}</p>
      <p className="">{`${subTitle}: ${subValue}`}</p>
    </div>
  );
};

export const Option = ({ url }: { url: string }) => {
  return (
    <Link to={url}>
      <button className="bg-green-600 text-white p-1 pl-4 pr-4 rounded-full font-bold text-lg cursor-pointer hover:scale-105 transition duration-200">
        New +
      </button>
    </Link>
  );
};
