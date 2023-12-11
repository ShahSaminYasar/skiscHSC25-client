import { Link, useLocation } from "react-router-dom";
import useUser from "../../../hooks/GET/useUser";
import Loader from "../../Loaders/Loader";
import moment from "moment";
import parse from "html-react-parser";
import useAuth from "../../../hooks/Auth/useAuth";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import SeeAllButton from "../../Buttons/SeeAllButton";

const PostCard = ({ post }) => {
  const postedBy = useUser(post?.by);
  let location = useLocation();
  location = location?.pathname || "/blog";
  const { user } = useAuth();

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
      className="w-full p-[2px] rounded-[15px] overflow-hidden mb-5 block max-w-[367px] mx-auto"
      style={{
        background: "linear-gradient(104deg, #2A34D2 0.79%, #7D1FC8 73.82%)",
      }}
    >
      <div className="w-full h-full bg-[#0D0321] text-white overflow-hidden rounded-[15px] flex flex-col gap-3">
        {/* [Thumbnail] */}
        <Link to={`/post/${post?._id}`} state={location}>
          <img
            src={
              post?.thumbnail ||
              "https://v4.tocas-ui.com/zh-tw/assets/images/16-9.png"
            }
            alt="Post Thumbnail"
            className="w-full object-cover rounded-[10px] aspect-[16/10] mb-3"
          />
        </Link>

        {/* [Text content] */}
        <div className="h-full px-5 pb-5 flex flex-col gap-3">
          <Link
            to={`/post/${post?._id}`}
            state={location}
            className="mb-[0px] text-[23px] sm:text-[25px] block w-fit font-[400]"
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
                <span className="block text-[#7820C9] text-[18px] font-[500]">
                  {postedBy?.[0]?.name}
                </span>
                <span className="block text-[#fff] text-opacity-60 text-[14px] font-[300] mt-[-4px]">
                  {moment(post?.date).format("DD MMM Y [at] hh:mma")}
                </span>
              </div>
            </div>
          )}
          <Link to={`/post/${post?._id}`} state={location}>
            <p className="text-white text-opacity-80 text-[17px] text-justify">
              {content?.length > 200 ? content?.slice(0, 200) + "..." : content}
            </p>
          </Link>

          {/* Buttons */}
          <div className="flex flex-row justify-between items-center w-full mt-auto">
            <Link
              to={`/post/${post?._id}`}
              state={location}
              className="text-[#F5154B] flex items-center gap-2 text-[18px]"
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
            {/* See all button link */}
            <SeeAllButton
              to={`/post/${post?._id}`}
              state={location}
              text="Read"
              className="ml-[0px] mt-auto"
            ></SeeAllButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
