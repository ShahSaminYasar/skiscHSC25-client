import moment from "moment";
import useUser from "../../hooks/GET/useUser";
import Loader from "../Loaders/Loader";

const User = ({ username, datetime }) => {
  let user = useUser(username);

  if (user?.isLoading) return <Loader />;
  if (user?.error) return <p className="text-red-500 inline-block">ERROR</p>;

  return (
    <div className="flex flex-row items-center gap-2 min-w-[300px]">
      <div className="mask mask-squircle w-[35px] h-[35px]">
        <img
          src={
            user?.[0]?.dp ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="User Profile Picture"
        />
      </div>
      <div className="flex flex-col gap-0 items-start text-left">
        <span className="text-[16px] xss:text-[17px] text-white font-[400]">
          {user?.[0]?.name}
        </span>
        <span className="block mt-[-3px] text-white text-opacity-40 font-[100] text-[14px]">
          {moment(datetime).format("[at] hh:mma on DD MMM Y")}
        </span>
      </div>
    </div>
  );
};
export default User;
