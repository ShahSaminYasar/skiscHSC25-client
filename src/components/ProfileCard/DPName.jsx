import useUser from "../../hooks/GET/useUser";
import Loader from "../Loaders/Loader";

const DPName = ({ username }) => {
  let user = useUser(username);

  if (user?.isLoading) return <Loader />;
  if (user?.error)
    return (
      <span className="text-red-500">
        {user?.error || "Failed to get user"}
      </span>
    );

  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="mask mask-squircle w-[26px] h-[26px]">
        <img
          src={
            user?.[0]?.dp ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="User Profile Picture"
        />
      </div>
      <span className="block text-[#ffffff] text-[16px] font-[300]">
        {user?.[0]?.name}
      </span>
    </div>
  );
};
export default DPName;
