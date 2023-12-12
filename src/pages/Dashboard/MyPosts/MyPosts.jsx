import { Link } from "react-router-dom";
import Title from "../../../components/Title/Title";
import NoDataText from "../../../components/NoData/NoDataText";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../../../hooks/Toaster/useToast";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import useAuth from "../../../hooks/Auth/useAuth";
import moment from "moment";
import toast from "react-hot-toast";
import usePosts from "../../../hooks/GET/usePosts";

const MyPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  let posts = usePosts(user?.username, null, true);
  const postsState = posts;
  posts = posts?.data;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const customToast = useToast;

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The post will be deleted and this action is irreversible.",
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, delete",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading("Deleting", {
          style: {
            background: "#010313",
            border: "2px solid #0CEFE3",
            color: "#0CEFE3",
            fontWeight: 500,
            fontSize: "16px",
          },
        });
        axiosSecure
          .delete(`/posts?id=${id}`)
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Deleted",
                text: `The post has been deleted.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getPosts"] });
              toast.dismiss();
            } else {
              Swal.fire({
                title: "Didn't Delete",
                text: res?.data?.message,
                icon: "error",
                background: "#04071F",
              });
            }
          })
          .catch((error) => {
            return customToast(error?.message || "An error occured", "error");
          });
      }
    });
  };

  return (
    <section className="w-full bg-[#010313]">
      <Helmet>
        <title>My Posts | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">My Posts</Title>
        <Link to="/add-post" className="buttonTwo">
          Make a post
        </Link>
      </div>

      {postsState?.isLoading ? (
        <LoaderDiv />
      ) : postsState?.error ? (
        <NoDataText>
          {postsState?.error || "An error occured while fetching the data."}
        </NoDataText>
      ) : posts?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead
              style={{
                background: "linear-gradient(91deg, #1E245A 0%, #261053 100%)",
              }}
              className="text-[18px] md:text-[19px] text-white font-[300] text-center"
            >
              <tr>
                <td className="rounded-l-[5px]">Image</td>
                <td className="text-left">Title</td>
                <td>Likes</td>
                <td>Date Posted</td>
                <td>Status</td>
                <td className="rounded-r-[5px] text-center">Actions</td>
              </tr>
            </thead>
            <tbody className="bg-[#080821]">
              {posts?.map((post) => (
                <tr
                  key={post?._id}
                  className="text-white text-opacity-80 font-[300] text-[17px] text-center"
                >
                  <td className="min-w-[150px]">
                    <img
                      src={
                        post?.thumbnail ||
                        "https://v4.tocas-ui.com/zh-tw/assets/images/16-9.png"
                      }
                      alt="Post thumbnail"
                      className="w-[100px] aspect-[16/10] object-cover rounded-sm block mx-auto"
                    />
                  </td>
                  <td className="text-left min-w-[250px]">{post?.title}</td>
                  <td>{post?.likes?.length}</td>
                  <td className="min-w-[150px]">
                    {moment(post?.date).format("DD MMM Y")}
                  </td>
                  <td
                    className={
                      post?.approved ? "text-[#3ace89]" : "text-[#ce3a3a]"
                    }
                  >
                    <span className="block w-[100px] mx-auto">
                      {post?.approved
                        ? "Approved"
                        : "Waiting for admin approval"}
                    </span>
                  </td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/post/${post?._id}`}
                        state={"/dashboard/my-posts"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-post/${post?._id}`}
                        className="btn btn-sm bg-[#261053] hover:bg-[#43257e] text-[#873ace] hover:text-[#dccaff] text-opacity-90 font-[500]"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                        onClick={() => handleDeletePost(post?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataText>You haven&apos;t posted anything yet. Post now?</NoDataText>
      )}
    </section>
  );
};
export default MyPosts;
