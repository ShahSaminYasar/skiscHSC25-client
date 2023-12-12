import { Helmet } from "react-helmet";
import Title from "../../components/Title/Title";
import Container from "../../layouts/Container/Container";
import { FaChevronLeft, FaCircleInfo } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import useToast from "../../hooks/Toaster/useToast";
import moment from "moment";
import Loader from "../../components/Loaders/Loader";

const AddVote = () => {
  let location = useLocation();
  location = location?.pathname || "/dashboard/my-votes";

  const axiosSecure = useAxiosSecure();
  const toast = useToast;
  const navigate = useNavigate();

  const [launching, setLaunching] = useState(false);

  const inputStyle = {
    fontSize: "20px",
    fontWeight: "400",
    color: "#ffffff",
    width: "100%",
    padding: "8px 12px",
    outline: "none",
    display: "block",
    borderBottom: "2px solid #3C3F58",
    background: "transparent",
  };

  const handleLaunchVote = async (e) => {
    e.preventDefault();
    setLaunching(true);
    const form = e.target;
    const title = form.title.value;
    const option1 = form.option1.value;
    const option2 = form.option2.value;
    const option3 = form.option3.value;
    const option4 = form.option4.value;
    const options = [];
    if (option1) {
      options.push({
        option: option1,
        votes: [],
      });
    }
    if (option2) {
      options.push({
        option: option2,
        votes: [],
      });
    }
    if (option3) {
      options.push({
        option: option3,
        votes: [],
      });
    }
    if (option4) {
      options.push({
        option: option4,
        votes: [],
      });
    }
    if (options.length < 2) {
      setLaunching(false);
      return toast("Please provide at least 2 options", "info");
    }
    const data = {
      title,
      datetime: moment().format(),
      options,
    };
    try {
      const response = await axiosSecure.post("/votes", data);
      if (response?.data?.message === "success") {
        setLaunching(false);
        toast("Vote launched", "success");
        return navigate("/votes");
      } else {
        setLaunching(false);
        return toast(
          response?.data?.message || "Failed to launch vote, please try again.",
          "error"
        );
      }
    } catch (error) {
      setLaunching(false);
      return toast(
        error?.message || "An error occured, please try again.",
        "error"
      );
    }
  };

  return (
    <section className="pt-[30px] pb-[60px] px-3 bg-[#010313]">
      <Helmet>
        <title>Launch a vote | SKISC HSC 2025</title>
      </Helmet>

      <Container>
        <Link to={location} className="backButton">
          <FaChevronLeft />
        </Link>
        <Title secondary={true} className="mt-[10px] mb-[20px] my-5">
          Launch a vote
        </Title>

        <form
          onSubmit={handleLaunchVote}
          className="flex w-full max-w-[500px] flex-col gap-3 mx-auto text-[18px] border-[2px] border-[#3C3F58] rounded-lg overflow-hidden"
        >
          <input
            type="text"
            name="title"
            style={inputStyle}
            required
            placeholder="Title"
          />
          <input
            type="text"
            name="option1"
            placeholder="Option 1"
            style={inputStyle}
          />
          <input
            type="text"
            name="option2"
            placeholder="Option 2"
            style={inputStyle}
          />
          <input
            type="text"
            name="option3"
            placeholder="Option 3"
            style={inputStyle}
          />
          <input
            type="text"
            name="option4"
            placeholder="Option 4"
            style={inputStyle}
          />
          <p className="w-full flex flex-row items-center gap-2 text-white text-opacity-50 font-[300] px-2">
            <FaCircleInfo /> If you don&apos;t need all 4 options, leave the
            extra ones empty.
          </p>
          <button
            type="submit"
            className="btn btn-md bg-indigo-800 text-white text-[18px] font-[300] mx-2 mb-3"
            disabled={launching}
          >
            {launching ? <Loader /> : "Launch Vote"}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default AddVote;
