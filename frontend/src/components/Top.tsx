const Top = ({
  oneLine = true,
  sub = true,
  title,
  title_new_line,
  subtitle,
}: {
  oneLine?: boolean;
  sub?: boolean;
  title: string;
  title_new_line?: string;
  subtitle?: string;
}) => {
  return (
    <div className="top bg-black/30 w-full justify-center items-center flex flex-col rounded-2xl p-5 h-70 mb-5 text-white">
      {oneLine && (
        <p className="font-bold text-4xl font-poppins text-yellow-500 uppercase tracking-widest">
          {title}
        </p>
      )}
      {!oneLine && (
        <h2 className="text-center text-white font-bold">
          <span className="font-poppins text-3xl">{title}</span>
          <br />
          {title_new_line && (
            <span className="text-yellow-500 tracking-wider font-lobster text-4xl">
              {title_new_line}
            </span>
          )}
        </h2>
      )}
      {sub && <p className="font-poppins mt-3 text-center">{subtitle}</p>}
    </div>
  );
};

export default Top;
