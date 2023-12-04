import useAuth from "../../hooks/Auth/useAuth";

const ProfileCard = ({ className = "" }) => {
  const { user } = useAuth();

  return (
    <div
      className={`flex flex-row gap-2 items-center justify-start ${className}`}
    >
      <img
        src={
          user?.dp ||
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        }
        alt="User Profile Picture"
        className="w-[40px] aspect-square object-cover rounded-full"
      />
      <div className="flex flex-col gap-0">
        <span className="text-white text-[18px] font-normal mb-[-3px]">
          {user?.name}
        </span>
        <span className="text-[17px] text-white text-opacity-50 font-light">
          @{user?.username}
        </span>
      </div>
    </div>
  );
};
export default ProfileCard;
