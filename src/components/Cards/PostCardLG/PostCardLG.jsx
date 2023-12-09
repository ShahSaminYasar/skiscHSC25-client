import moment from "moment";
import useUser from "../../../hooks/GET/useUser";
import Loader from "../../Loaders/Loader";
import useAuth from "../../../hooks/Auth/useAuth";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import SeeAllButton from "../../Buttons/SeeAllButton";
import "./PostCardLG.css";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const PostCardLG = ({ post, slideState, handleNextSlide, handlePrevSlide }) => {
  const postedBy = useUser(post?.by);
  const { user } = useAuth();

  const { isFirst, isLast } = slideState;

  const postContent = parse(post?.content);
  const extractTextContent = (element) => {
    if (typeof element === "string") {
      return element;
    }
    if (Array.isArray(element)) {
      return element.map(extractTextContent).join(" ");
    }
    if (element.props && element.props.children) {
      return extractTextContent(element.props.children);
    }
    return "";
  };
  const content = extractTextContent(postContent);

  return (
    <div
      className="p-[2px] rounded-[15px] overflow-hidden mb-5"
      style={{
        background: "linear-gradient(104deg, #2A34D2 0.79%, #7D1FC8 73.82%)",
      }}
    >
      <div className="bg-[#0D0321] text-white p-5 rounded-[15px] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {/* Left side [Thumbnail] */}
        <Link to={`/post/${post?._id}`} state={"/"}>
          <img
            src={
              post?.thumbnail ||
              "https://v4.tocas-ui.com/zh-tw/assets/images/16-9.png"
            }
            alt="Post Thumbnail"
            className="sm:h-full w-full object-cover rounded-[10px] aspect-[16/10] sm:aspect-auto"
          />
        </Link>

        {/* Right side [Text content] */}
        <div className="flex flex-col justify-between gap-3 sm:h-full sm:col-span-2">
          <Link
            to={`/post/${post?._id}`}
            state={"/"}
            className="mb-[0px] text-[24px] sm:text-[28px] md:text-[30px] block w-fit font-[400]"
          >
            {post?.title?.length > 40
              ? post?.title?.slice(0, 40) + "..."
              : post?.title}
          </Link>
          {postedBy?.isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-row gap-1 items-center">
              <div className="mask mask-squircle w-[35px] h-[35px]">
                <img
                  src={
                    postedBy?.[0]?.dp ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt="User Profile Picture"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="block text-[#7820C9] text-[18px] font-[400]">
                  {postedBy?.[0]?.name}
                </span>
                <span className="block text-[#fff] text-opacity-70 text-[14px] font-[300] mt-[-4px]">
                  {moment(post?.date).format("DD MMM Y [at] hh:mma")}
                </span>
              </div>
            </div>
          )}
          <Link to={`/post/${post?._id}`} state={"/"}>
            <p className="text-white text-opacity-80 text-[17px] text-justify">
              {content?.length > 200 ? content?.slice(0, 200) + "..." : content}
            </p>
          </Link>
          <Link
            to={`/post/${post?._id}`}
            state={"/"}
            className="text-[#F5154B] flex items-center gap-2 text-[18px] mb-5"
          >
            <span className="text-[23px] mt-[-2px] cursor-pointer">
              {post?.likes?.includes(user?.username) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </span>
            <span>
              {post?.likes?.length === 1
                ? post?.likes?.length + " like"
                : post?.likes?.length + " likes"}
            </span>
          </Link>

          {/* Buttons */}
          <div className="flex flex-row justify-between items-center gap-3">
            {/* See all button link */}
            <SeeAllButton
              to={`/post/${post?._id}`}
              text="Read"
              className="ml-[0px] mt-auto"
            ></SeeAllButton>

            {/* Navigation Buttons */}
            <div className="absolute bottom-[40px] right-5 z-[10] flex flex-row gap-2 items-center">
              <button
                onClick={handlePrevSlide}
                className={`text-[20px] text-[#9255F5] bg-transparent block disabled:opacity-50 backButton`}
                disabled={isFirst}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNextSlide}
                className={`text-[20px] text-[#9255F5] bg-transparent block disabled:opacity-50 backButton`}
                disabled={isLast}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCardLG;
