import { FaChevronLeft } from "react-icons/fa6";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import useToast from "../../hooks/Toaster/useToast";
import useAuth from "../../hooks/Auth/useAuth";
import Container from "../../layouts/Container/Container";
import Title from "../../components/Title/Title";
import Loader from "../../components/Loaders/Loader";
import axios from "axios";

const AddQnA = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();
  const toast = useToast;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [adding, setAdding] = useState(false);

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

  const handleAddQnA = async (e) => {
    e.preventDefault();
    setAdding(true);
    // Form
    const form = e.target;
    // Form Inputs
    const question = form.question.value;
    const image = form.image.files;

    let image_url = "";
    if (image?.[0]) {
      const imageFile = image?.[0];
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
        setAdding(false);
        return toast("Couldn't upload image, please try again.", "error");
      }
    }

    // The data object
    const data = {
      by: user?.username,
      question,
      image: image_url,
      datetime: moment().format(),
    };

    try {
      const response = await axiosSecure.post("/qna", { qna: data });
      const result = response?.data;
      if (result?.message === "success") {
        toast("QnA added", "success");
        setAdding(false);
        queryClient.invalidateQueries({ id: ["getQnA"] });
        return navigate("/dashboard/qna");
      } else {
        setAdding(false);
        return toast(result?.message || "Failed to post QnA", "error");
      }
    } catch (error) {
      setAdding(false);
      console.error(error || "Error");
      return toast(error?.message || "Error occured while POSTing", "error");
    }
  };

  return (
    <section className="pt-[30px] pb-[60px] px-3">
      <Helmet>
        <title>Add QnA | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <Link to={`/dashboard/qna`} className="backButton">
          <FaChevronLeft />
        </Link>
        <Title secondary={true} className="mt-[10px] mb-[20px] my-5">
          Add QnA
        </Title>

        <form
          onSubmit={handleAddQnA}
          className="w-full max-w-[647px] mx-auto flex flex-col gap-[13px]"
        >
          <textarea
            name="question"
            style={inputStyle}
            placeholder="Type your question here..."
          ></textarea>
          <div>
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              Image (if any)
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="transition-none text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="buttonTwo w-fit ml-auto disabled:opacity-50"
            style={{ padding: "8px 22px" }}
            disabled={adding}
          >
            {!adding ? "Add QnA" : <Loader />}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default AddQnA;
