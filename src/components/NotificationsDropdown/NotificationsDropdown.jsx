import { Link, useLocation } from "react-router-dom";
import useNotifications from "../../hooks/GET/useNotifications";
import Loader from "../Loaders/Loader";
import NoDataText from "../NoData/NoDataText";
import TitleSM from "../Title/TitleSM";
import { FaBell, FaCheckDouble } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import useAuth from "../../hooks/Auth/useAuth";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import useToast from "../../hooks/Toaster/useToast";

const NotificationsDropdown = () => {
  let notifications = useNotifications();
  const notificationsState = notifications;
  const notificationsRefetch = notifications?.refetch;
  notifications = notifications?.data;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const toast = useToast;

  let location = useLocation();
  location = location?.pathname || "/";

  const handleDeleteNotifications = async () => {
    const result = await axiosSecure.delete(
      `/notifications?username=${user?.username}`
    );
    if (result?.data?.message === "success") {
      notificationsRefetch();
    } else {
      return toast(
        result?.data?.message ||
          "An error occured while clearing notifications. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="text-[20px]">
        <div className="relative">
          <span
            className={`${
              notifications?.length > 0 ? "inline-block" : "hidden"
            } w-[10px] aspect-square rounded-full bg-rose-600 absolute -top-[3px] -right-[3px]`}
          ></span>
          <FaBell />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content max-h-[300px] overflow-y-auto z-[1] mt-2 w-[200px] xs:w-[240px] xss:w-[350px] p-2 shadow bg-[#02051E] rounded-md border-[2px] border-[#2A34D2] flex flex-col gap-0 items-start text-[18px]"
      >
        <li className="w-full flex flex-row gap-1 flex-wrap items-center justify-between mb-[15px]">
          <TitleSM className="mt-[0px] mb-[0px] leading-[30px]">
            Notifications
          </TitleSM>
          <div className="flex gap-5 text-[20px] text-opacity-70 flex-row-reverse">
            <button
              onClick={() => notificationsRefetch()}
              className="text-white text-opacity-40"
            >
              <LuRefreshCw />
            </button>
            <button
              onClick={handleDeleteNotifications}
              className="text-[#00ECA5]"
            >
              <FaCheckDouble />
            </button>
          </div>
        </li>
        {notificationsState?.isLoading ? (
          <Loader />
        ) : notificationsState?.error ? (
          <NoDataText>
            {notificationsState?.error ||
              "An error occured, please refresh the page"}
          </NoDataText>
        ) : notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <li key={notification?._id} className="block w-full mb-[5px]">
              <Link
                state={location}
                to={
                  notification?.type
                    ? notification?.type !== "user"
                      ? `/${notification?.type}/${notification?.id}`
                      : `/dashboard/users`
                    : `/dashboard`
                }
                className="bg-[#030934] rounded-md p-3 w-full block"
              >
                {notification?.message}
              </Link>
            </li>
          ))
        ) : (
          <NoDataText>No new notifications.</NoDataText>
        )}
      </ul>
    </div>
  );
};
export default NotificationsDropdown;
