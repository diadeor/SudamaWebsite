const Category = ({ img, name }: { img: string; name: string }) => {
  return (
    <div className="category flex flex-col items-center">
      <img src={img} alt="" className="w-40 rounded-full bg-emerald-200 shadow-xl" />
      <p className="font-lobster tracking-widest text-xl">{name}</p>
    </div>
  );
};

export default Category;
