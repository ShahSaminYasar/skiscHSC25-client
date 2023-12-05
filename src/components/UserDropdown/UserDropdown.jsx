import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { FaUser } from "react-icons/fa6";

const UserDropdown = () => {
  const { user } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="mask mask-squircle w-[35px] h-[35px]"
      >
        <img
          src={
            user?.dp ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="User Profile Picture"
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] mt-2 p-2 shadow bg-[#02051E] rounded-md w-56 border border-[#2A34D2] flex flex-col gap-2 items-start text-[18px]"
      >
        <div>
          <li className="text-slate-100 text-[20px] font-normal mb-[-3px]">
            {user?.name}
          </li>
          <li className="text-[16px] text-slate-500 font-normal">
            @{user?.username}
          </li>
        </div>
        <li className="w-full py-1 px-3 bg-gradient-to-r from-[#171a4d] to-[#182058] rounded-md">
          <NavLink
            to="/dashboard"
            className={`w-full flex flex-row gap-2 items-center`}
          >
            <FaUser className={`mt-[-3px] text-[15px]`} /> Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default UserDropdown;
