import moment from "moment";
import useUser from "../../../hooks/GET/useUser";
import Loader from "../../Loaders/Loader";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const QnACard = ({ qna }) => {
  const user = useUser(qna?.by);
  let location = useLocation();
  location = location?.pathname || "/";

  return (
    <div
      className="p-5 rounded-[15px] overflow-hidden mb-10 flex flex-col gap-0"
      style={{
        background: "linear-gradient(104deg, #2A34D2 0.79%, #7D1FC8 73.82%)",
      }}
    >
      {user?.isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row items-center gap-1 w-full max-w-[500px] mx-auto text-[18px] text-white text-opacity-70">
          <div className="mask mask-squircle w-[35px] h-[35px]">
            <img
              src={
                user?.[0]?.dp ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
              alt="User Profile Picture"
              className="w-full aspect-square object-cover"
            />
          </div>
          <span>
            By <span className="font-[400]">{user?.[0]?.name}</span> on{" "}
            <span className="font-[400]">
              {moment(qna?.datetime).format("DD MMM Y")}
            </span>
          </span>
        </div>
      )}
      <p className="text-[17px] sm:text-[20px] text-white text-opacity-90 text-left my-4">
        {qna?.question?.length > 200
          ? qna?.question?.slice(0, 200) + "..."
          : qna?.question}
      </p>
      <Link
        to={`/qna/${qna?._id}`}
        state={location}
        className="mt-auto text-[17px] sm:text-[20px] text-white text-opacity-90 flex items-center gap-1 hover:gap-3 justify-end"
      >
        Answers <FaArrowRight />
      </Link>
    </div>
  );
};
export default QnACard;
