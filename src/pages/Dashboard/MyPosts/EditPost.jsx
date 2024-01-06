import { FaChevronLeft } from "react-icons/fa6";
import Container from "../../../layouts/Container/Container";
import Title from "../../../components/Title/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loaders/Loader";
import useToast from "../../../hooks/Toaster/useToast";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/Auth/useAuth";
import { Helmet } from "react-helmet";
import JoditEditor from "jodit-react";
import axios from "axios";
import usePosts from "../../../hooks/GET/usePosts";
import LoaderPage from "../../../components/Loaders/LoaderPage";
import NoDataText from "../../../components/NoData/NoDataText";

const EditPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  let post = usePosts(null, id);
  const postState = post;
  post = post?.data?.[0];
  const { user } = useAuth();
  const toast = useToast;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [updating, setUpdating] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post?.content) {
      setContent(post?.content);
    }
  }, [post?.content, setContent]);

  if (postState?.isLoading) return <LoaderPage />;
  if (postState?.error)
    return (
      <NoDataText>
        {postState?.error || "An error occured. Please refresh and try again."}
      </NoDataText>
    );

  if (post?.by !== user?.username) {
    return <Navigate to="/dashboard/my-posts" />;
  }

  const inputStyle = {
    fontSize: "20px",
    fontWeight: "400",
    color: "#ffffff",
    width: "100%",
    padding: "8px 12px",
    outline: "none",
    display: "block",
    borderRadius: "8px",
    border: "2px solid #3C3F58",
    background: "#0B0F2E",
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.target;

    let image_url = post?.thumbnail;
    if (form?.thumbnail?.files?.[0]) {
      console.log("Posting thumbnail image/picture/photo");
      const imageFile = form?.thumbnail?.files?.[0];
      const imgbb = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_APIKEY
        }`,
        { image: imageFile },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      // console.log("IMGBB response => ", imgbb);
      if (imgbb?.data?.success === true) {
        image_url = imgbb?.data?.data?.display_url;
      } else {
        setUpdating(false);
        return toast("Couldn't upload image, please try again.", "error");
      }
    }

    const data = {
      thumbnail: image_url,
      title: form?.title?.value,
      content,
      by: user?.username,
      date: moment(),
    };

    try {
      const response = await axiosSecure.put("/posts", {
        postId: id,
        post: data,
      });
      const result = response?.data;
      if (result?.message === "success") {
        toast("Post updated", "success");
        setUpdating(false);
        queryClient.invalidateQueries({ id: ["getPosts"] });
        return navigate("/dashboard/my-posts");
      } else if (result?.message === "not-modified") {
        toast("You didn't modify anything", "info");
        setUpdating(false);
        return navigate("/dashboard/my-posts");
      } else {
        setUpdating(false);
        return toast(result?.message || "Failed to update the post", "error");
      }
    } catch (error) {
      setUpdating(false);
      console.error(error || "Error");
      return toast(error?.message || "Error occured while POSTing", "error");
    }
  };

  return (
    <section className="pt-[30px] pb-[60px] px-3 bg-[#010313]">
      <Helmet>
        <title>Edit post | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <Link to={`/dashboard/my-posts`} className="backButton">
          <FaChevronLeft />
        </Link>
        <Title secondary={true} className="mt-[10px] mb-[20px] my-5">
          Edit post
        </Title>

        <form
          onSubmit={handleEditPost}
          className="w-full max-w-[647px] mx-auto flex flex-col gap-[13px]"
        >
          <input
            type="text"
            style={inputStyle}
            defaultValue={post?.title}
            name="title"
            placeholder="Title"
            required
          />

          <JoditEditor
            value={content}
            onBlur={(newContent) => setContent(newContent)}
          />

          <div>
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              Thubmbail (Don&apos;t modify if you want to keep the previous one)
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
              <input
                type="file"
                className="transition-none text-white bg-transparent"
                name="thumbnail"
                accept="image/*"
                multiple
              />
            </div>
          </div>
          <button
            type="submit"
            className="buttonTwo w-fit ml-auto disabled:opacity-50"
            style={{ padding: "8px 22px" }}
            disabled={updating}
          >
            {!updating ? "Update" : <Loader />}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default EditPost;
