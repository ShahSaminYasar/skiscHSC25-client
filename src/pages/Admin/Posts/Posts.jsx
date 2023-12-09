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
import moment from "moment";
import toast from "react-hot-toast";
import usePosts from "../../../hooks/GET/usePosts";

const Posts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let posts = usePosts(null, null, true);
  const postsState = posts;
  posts = posts?.data;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const customToast = useToast;

  const handleApprovePost = async (id, approved) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The post will be ${approved ? "blocked" : "approved"}.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, proceed",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading(`${approved ? "Blocking" : "Approving"}`, {
          style: {
            background: "#010313",
            border: "2px solid #0CEFE3",
            color: "#0CEFE3",
            fontWeight: 500,
            fontSize: "16px",
          },
        });
        axiosSecure
          .put(`/posts?block=true`, { postId: id })
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: `${approved ? "Blocked" : "Approved"}`,
                text: `The post has been ${approved ? "blocked" : "approved"}.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getPosts"] });
              toast.dismiss();
            } else {
              toast.dismiss();
              Swal.fire({
                title: "Operation Undone",
                text: res?.data?.message,
                icon: "error",
                background: "#04071F",
              });
            }
          })
          .catch((error) => {
            toast.dismiss();
            return customToast(error?.message || "An error occured", "error");
          });
      }
    });
  };

  return (
    <section className="w-full">
      <Helmet>
        <title>Manage Posts | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">Manage Posts</Title>
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
                <td className="text-left">User</td>
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
                  <td>
                    <img
                      src={
                        post?.thumbnail ||
                        "https://v4.tocas-ui.com/zh-tw/assets/images/16-9.png"
                      }
                      alt="Post thumbnail"
                      className="w-[100px] aspect-[16/10] object-cover rounded-sm block mx-auto"
                    />
                  </td>
                  <td className="text-left">{post?.title}</td>
                  <td>{post?.likes?.length}</td>
                  <td className="text-left">
                    @{post?.by}
                    <br />
                    <span className="block text-white text-opacity-50 text-[17px]">
                      {moment(post?.date).format("DD MMM Y [at] hh:mma")}
                    </span>
                  </td>
                  <td
                    className={
                      post?.approved ? "text-[#3ace89]" : "text-[#ce3a3a]"
                    }
                  >
                    {post?.approved ? "Approved" : "Waiting"}
                  </td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/post/${post?._id}`}
                        state={"/dashboard/posts"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                      {!post?.approved ? (
                        <button
                          className="btn btn-sm bg-[#1e724b] hover:bg-[#3ace89] text-[#3ace89] hover:text-[#dccaff] text-opacity-90 font-[500]"
                          onClick={() =>
                            handleApprovePost(post?._id, post?.approved)
                          }
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                          onClick={() =>
                            handleApprovePost(post?._id, post?.approved)
                          }
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataText>Nobody has posted anything yet.</NoDataText>
      )}
    </section>
  );
};
export default Posts;
