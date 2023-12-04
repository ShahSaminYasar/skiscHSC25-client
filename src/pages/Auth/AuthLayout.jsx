import BGGfx from "../../assets/bg-graphics.jpg";

const AuthLayout = ({title, children}) => {
  return (
    <div className="md:flex flex-row min-h-screen">
      <div className="hidden md:block w-1/3 relative">
        <div
          style={{
            background: `linear-gradient(188deg, rgba(3, 8, 50, 0.90) 1.07%, rgba(87, 44, 210, 0.90) 117.56%), url(${BGGfx}), lightgray 50% / cover no-repeat`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="hidden h-full md:flex flex-col items-center justify-center fixed top-0 bottom-0 left-0 w-1/3"
        >
          <h2 className="-rotate-90 lg:-rotate-0 text-[55px] lg:text-[60px] font-[700] text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col py-20 px-3 md:px-10 justify-center items-center">
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
