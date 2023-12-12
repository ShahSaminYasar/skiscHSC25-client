import { FaChevronLeft } from "react-icons/fa6";
import Container from "../../../layouts/Container/Container";
import Title from "../../../components/Title/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loaders/Loader";
import useToast from "../../../hooks/Toaster/useToast";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/Auth/useAuth";
import { Helmet } from "react-helmet";
import JoditEditor from "jodit-react";
import axios from "axios";

const AddPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();
  const toast = useToast;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [posting, setPosting] = useState(false);
  const [content, setContent] = useState("");

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

  const handleMakePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    const form = e.target;

    let image_url = "";
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
        setPosting(false);
        return toast("Couldn't upload image, please try again.", "error");
      }
    }

    const data = {
      title: form?.title?.value,
      thumbnail: image_url,
      by: user?.username,
      date: moment(),
      content,
    };

    try {
      const response = await axiosSecure.post("/posts", {
        post: data,
      });
      const result = response?.data;
      if (result?.message === "success") {
        toast("Post added", "success");
        setPosting(false);
        queryClient.invalidateQueries({ id: ["getPosts"] });
        return navigate("/dashboard/my-posts");
      } else {
        setPosting(false);
        return toast(result?.message || "Failed to post post", "error");
      }
    } catch (error) {
      setPosting(false);
      console.error(error || "Error");
      return toast(error?.message || "Error occured while POSTing", "error");
    }
  };

  return (
    <section className="pt-[30px] pb-[60px] px-3 bg-[#010313]">
      <Helmet>
        <title>Make a post | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <Link to={`/dashboard/my-posts`} className="backButton">
          <FaChevronLeft />
        </Link>
        <Title secondary={true} className="mt-[10px] mb-[20px] my-5">
          Make a post
        </Title>

        <form
          onSubmit={handleMakePost}
          className="w-full max-w-[647px] mx-auto flex flex-col gap-[13px]"
        >
          <input
            type="text"
            style={inputStyle}
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
              Thubmbail
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
            disabled={posting}
          >
            {!posting ? "Post" : <Loader />}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default AddPost;
