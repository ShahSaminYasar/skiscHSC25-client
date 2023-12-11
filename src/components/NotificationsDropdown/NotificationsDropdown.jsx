import { Link, useLocation } from "react-router-dom";
import useNotifications from "../../hooks/GET/useNotifications";
import Loader from "../Loaders/Loader";
import NoDataText from "../NoData/NoDataText";
import TitleSM from "../Title/TitleSM";
import { FaBell } from "react-icons/fa6";

const NotificationsDropdown = () => {
  let notifications = useNotifications();
  const notificationsState = notifications;
  notifications = notifications?.data;

  let location = useLocation();
  location = location?.pathname || "/";

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="text-[20px]">
        <FaBell />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content max-h-[300px] overflow-y-auto z-[1] mt-2 w-[200px] xs:w-[240px] xss:w-[350px] p-2 shadow bg-[#02051E] rounded-md border-[2px] border-[#2A34D2] flex flex-col gap-0 items-start text-[18px]"
      >
        <li>
          <TitleSM className="mt-[0px] mb-[15px]">Notifications</TitleSM>
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
