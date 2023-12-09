import BGGFX from "../../assets/bg-graphics.jpg";

const PageBanner = ({ children }) => {
  const bg = {
    background: `linear-gradient(188deg, rgba(3, 8, 50, 0.90) 1.07%, rgba(87, 44, 210, 0.90) 117.56%), url(${BGGFX}), lightgray 50% / cover no-repeat`,
    backgroundPosition: "center",
  };
  return (
    <div
      style={bg}
      className="w-full mb-2 px-3 py-10 md:py-14 text-center text-[50px] text-white font-[400] uppercase"
    >
      {children}
    </div>
  );
};
export default PageBanner;
