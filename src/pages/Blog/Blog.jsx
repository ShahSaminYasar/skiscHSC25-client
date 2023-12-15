import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { FaChevronLeft, FaHeart, FaRegHeart } from "react-icons/fa6";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Loader from "../../components/Loaders/Loader";
import useAuth from "../../hooks/Auth/useAuth";
import moment from "moment";
import usePosts from "../../hooks/GET/usePosts";
import useUser from "../../hooks/GET/useUser";
import parse from "html-react-parser";
import useToast from "../../hooks/Toaster/useToast";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import DPName from "../../components/ProfileCard/DPName";
import TitleSM from "../../components/Title/TitleSM";
import Comments from "../../components/Comments/Comments";

const Blog = () => {
  let location = useLocation();
  location = location?.state || "/dashboard/my-posts";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  let post = usePosts(null, id);
  const postState = post;
  const postRefetch = post?.refetch;
  post = post?.data?.[0];
  const { user } = useAuth();
  const toast = useToast;
  const axiosSecure = useAxiosSecure();

  const postedBy = useUser(post?.by);

  const [liking, setLiking] = useState(false);

  if (postState?.isLoading) return <LoaderPage />;
  if (postState?.error) return <NoDataText>{postState?.error}</NoDataText>;
  if (!post) return <Navigate to="/blog" />;

  if (!post?.approved) {
    if (
      user?.username !== post?.by &&
      user?.role !== "admin" &&
      user?.role !== "developer"
    )
      return <Navigate to="/blog" />;
  }

  const handleLikePost = async () => {
    setLiking(true);
    try {
      const result = await axiosSecure.post("/like-post", {
        postId: id,
        username: user?.username,
      });
      if (result?.data?.message === "success") {
        postRefetch();
        setLiking(false);
      } else {
        setLiking(false);
        return toast(
          result?.data?.message || "Post was not liked, please try again.",
          "info"
        );
      }
    } catch (error) {
      setLiking(false);
      return toast(error?.message || "An error occured", "error");
    }
  };

  return (
    <section className="section bg-[#010313]">
      <Helmet>
        <title>{post?.title || "Blog"} | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
          <Link to={location} className="backButton">
            <FaChevronLeft />
          </Link>
        </div>
        {!post?.approved && (
          <span className="text-red-500 text-[20px] font-[500] py-1 px-2 rounded-md bg-black shadow-md">
            NOT APPROVED YET
          </span>
        )}
        {post?.thumbnail && (
          <img
            src={post?.thumbnail}
            alt="Post Thumbnail"
            className="rounded-md mx-auto w-full h-auto block max-w-[600px] mb-7 md:mb-[52px]"
          />
        )}
        <h1 className="text-[27px] sm:text-[34px] md:text-[40px] font-[400] text-white block text-left mb-3">
          {post?.title}
        </h1>
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
                className="w-full aspect-square object-cover"
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
        <div className="text-[18px] mt-5 text-white text-opacity-90 text-justify">
          {parse(post?.content)}
        </div>
        <div className="text-[#F5154B] flex items-center gap-2 text-[18px] mt-7">
          <button
            className="text-[23px] mt-[-2px] cursor-pointer"
            onClick={handleLikePost}
            disabled={liking || !post?.approved}
          >
            {liking ? (
              <span className="loading loading-spinner w-[23px] h-[23px] mt-[7px]"></span>
            ) : post?.likes?.includes(user?.username) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <button
            onClick={() => document.getElementById("likes_modal").showModal()}
          >
            {post?.likes?.length === 1
              ? post?.likes?.length + " like"
              : post?.likes?.length + " likes"}
          </button>
        </div>
        <Comments
          type={`blog`}
          id={post?._id}
          comments={post?.comments}
          refetch={postRefetch}
        />
      </Container>

      <dialog
        id="likes_modal"
        className="modal bg-gradient-to-br from-[#1c227a93] to-[#5d26cc2a] bg-opacity-50 backdrop-blur-sm"
      >
        <div className="modal-box max-w-[400px] bg-[#010313]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <TitleSM className="mt-[-10px]">Likes</TitleSM>
          {post?.likes?.length > 0 ? (
            post?.likes?.map((like) => (
              <div
                key={like}
                className="px-2 py-2 border-b-[1px] border-b-slate-900"
              >
                <DPName username={like} />
              </div>
            ))
          ) : (
            <NoDataText>No likes yet.</NoDataText>
          )}
        </div>
      </dialog>
    </section>
  );
};
export default Blog;
