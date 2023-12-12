import {
  Link,
  ScrollRestoration,
  useLocation,
  useParams,
} from "react-router-dom";
import useQnA from "../../hooks/GET/useQnA";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import { Helmet } from "react-helmet";
import Container from "../../layouts/Container/Container";
import { FaChevronLeft } from "react-icons/fa6";
import useUser from "../../hooks/GET/useUser";
import Loader from "../../components/Loaders/Loader";
import moment from "moment";
import TitleSM from "../../components/Title/TitleSM";
import User from "../../components/Comments/User";
import { useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import useToast from "../../hooks/Toaster/useToast";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";

const QnA = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast;
  const axiosSecure = useAxiosSecure();

  let qna = useQnA(null, id);
  const qnaState = qna;
  const qnaRefetch = qna?.refetch;
  qna = qna?.data?.[0];
  const questionedBy = useUser(qna?.by);

  let location = useLocation();
  location = location?.state || "/";

  const [adding, setAdding] = useState(false);

  if (qnaState?.isLoading) return <LoaderPage />;
  if (qnaState?.error)
    return (
      <NoDataText>
        {qnaState?.error || "An error occured, please refresh"}
      </NoDataText>
    );

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    const form = e.target;
    setAdding(true);
    const answer = form.answer.value;
    const data = {
      answer,
      by: user?.username,
      datetime: moment().format(),
    };
    try {
      const response = await axiosSecure.put("/qna", {
        id: qna?._id,
        answer: data,
      });
      if (response?.data?.message === "success") {
        setAdding(false);
        form.answer.value = "";
        qnaRefetch();
        return toast("Answer added", "success");
      } else {
        setAdding(false);
        return toast(
          response?.data?.message || "Couldn't add answer, please try again",
          "success"
        );
      }
    } catch (error) {
      setAdding(false);
      return toast(
        error?.message || "An error occured, please try again.",
        "error"
      );
    }
  };

  return (
    <section className="section bg-[#010313]">
      <ScrollRestoration />
      <Helmet>
        <title>{qna?.question || "QnA"} | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
          <Link to={location} className="backButton">
            <FaChevronLeft />
          </Link>
        </div>
        {questionedBy?.isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-row gap-1 items-center">
            <div className="mask mask-squircle w-[35px] h-[35px]">
              <img
                src={
                  questionedBy?.[0]?.dp ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                }
                alt="User Profile Picture"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="block text-[#7820C9] text-[18px] font-[400]">
                {questionedBy?.[0]?.name}
              </span>
              <span className="block text-[#fff] text-opacity-70 text-[14px] font-[300] mt-[-4px]">
                {moment(qna?.datetime).format("DD MMM Y [at] hh:mma")}
              </span>
            </div>
          </div>
        )}
        <p className="text-[18px] text-white text-justify my-2">
          {qna?.question}
        </p>
        {qna?.image && (
          <img
            src={qna?.image}
            alt="QnA Image"
            className="rounded-md mx-auto w-full h-auto block max-w-[600px] my-7"
          />
        )}
        <TitleSM>Answers</TitleSM>
        {qna?.answers?.length > 0 ? (
          qna?.answers?.map((answer) => (
            <div
              key={answer?.datetime}
              className="flex flex-col items-start gap-0 mb-4"
            >
              <User username={answer?.by} datetime={answer?.datetime} />
              <p className="text-[18px] text-white text-opacity-90">
                {answer?.answer}
              </p>
            </div>
          ))
        ) : (
          <NoDataText>
            No one has answered yet. Be the first one to answer 👇🏻
          </NoDataText>
        )}
        <TitleSM>Know the answer?</TitleSM>
        <form
          onSubmit={handleAddAnswer}
          className="w-full flex flex-row justify-between items-center gap-1 text-[18px] text-white text-opacity-80 border-b-2 border-b-slate-800 max-w-3xl mb-5"
        >
          <input
            type="text"
            placeholder="Unfold the mistery, write it here..."
            name="answer"
            required
            className="w-full px-3 py-2 bg-transparent outline-none"
          />
          <button
            type="submit"
            className="btn btn-sm bg-[#02062D]"
            disabled={adding}
          >
            {adding ? "Adding..." : "Add answer"}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default QnA;
