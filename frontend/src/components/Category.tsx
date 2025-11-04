const Category = ({ img, name, setName }: { img: string; name: string; setName: Function }) => {
  return (
    <div
      className="category flex flex-col items-center cursor-pointer"
      onClick={(e) => setName(name)}
    >
      <img src={img} alt="" className="w-40 rounded-full bg-emerald-200 shadow-xl" />
      <p className="font-lobster tracking-widest text-xl">{name}</p>
    </div>
  );
};

export default Category;
