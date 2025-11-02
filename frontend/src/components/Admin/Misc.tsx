import type { ReactNode } from "react";
import { Link } from "react-router-dom";
export const AdminCard = ({
  title,
  value,
  subTitle,
  subValue,
  icon,
  toUrl,
}: {
  title: string;
  value: number;
  subTitle: string;
  subValue: number;
  icon: ReactNode;
  toUrl: string;
}) => {
  return (
    <Link to={toUrl} className="grow">
      <div className="users min-w-45 bg-black/60 text-white p-5 pt-3 pb-3 rounded-xl">
        <p className="font-fauna tracking-wider text-yellow-600 font-bold mb-2 uppercase flex flex-row items-center gap-2">
          {icon}
          {title}
        </p>
        <p className="font-bold text-2xl mb-2 font-jetbrains">{value}</p>
        <p className="font-fauna">{`${subTitle}: ${subValue}`}</p>
      </div>
    </Link>
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
