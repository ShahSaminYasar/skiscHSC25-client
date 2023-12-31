import useUser from "../../hooks/GET/useUser";
import Loader from "../Loaders/Loader";

const DPName = ({ username, className = "", textStyle = "" }) => {
  let user = useUser(username);

  if (user?.isLoading) return <Loader />;
  if (user?.error)
    return (
      <span className="text-red-500">
        {user?.error || "Failed to get user"}
      </span>
    );

  return (
    <div
      className={`flex flex-row gap-2 items-center  text-[#ffffff] text-xl font-[300] ${
        className && className
      }`}
    >
      <div className="mask mask-squircle w-[32px] h-[32px]">
        <img
          src={
            user?.[0]?.dp ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="User Profile Picture"
          className="w-full aspect-square object-cover"
        />
      </div>
      <span className={`block ${textStyle}`}>{user?.[0]?.name}</span>
    </div>
  );
};
export default DPName;
