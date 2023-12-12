import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { FaChevronLeft } from "react-icons/fa6";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import DetailsPageTitle from "../../components/Title/DetailsPageTitle";
import TitleSM from "../../components/Title/TitleSM";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import moment from "moment";
import useNotes from "../../hooks/GET/useNotes";
import useUser from "../../hooks/GET/useUser";
import Comments from "../../components/Comments/Comments";

const Note = () => {
  let location = useLocation();
  location = location?.state || "/notes";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  let note = useNotes(null, id);
  const noteState = note;
  const noteRefetch = note?.refetch;
  note = note?.data?.[0];
  const { user } = useAuth();

  const postedBy = useUser(note?.by);

  if (noteState?.isLoading) return <LoaderPage />;
  if (noteState?.error) return <NoDataText>{noteState?.error}</NoDataText>;
  if (!note) return <Navigate to="/notes" />;

  if (!note?.approved) {
    if (
      user?.username !== note?.by &&
      user?.role !== "admin" &&
      note?.role !== "developer"
    ) {
      return <Navigate to="/notes" replace />;
    }
  }

  return (
    <section className="section bg-[#010313]">
      <Helmet>
        <title>{note?.subject || ""} Note | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
          <Link to={location} className="backButton">
            <FaChevronLeft />
          </Link>
        </div>
        {!note?.approved && (
          <span className="text-red-500 text-[20px] font-[500] py-1 px-2 rounded-md bg-black shadow-md">
            NOT APPROVED YET
          </span>
        )}
        <DetailsPageTitle type={"note"}>{note?.subject}</DetailsPageTitle>
        <div className="flex flex-row items-center gap-1 justify-start mb-4">
          <div className="flex flex-row gap-2 items-center justify-start w-full">
            <div className="mask mask-squircle w-[25px] h-[25px]">
              <img
                src={
                  postedBy?.[0]?.dp ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                }
                alt="User Profile Picture"
              />
            </div>
            <span className="text-white text-opacity-80 font-[300] text-[16px]">
              By{" "}
              <span className={`text-[#7820C9] font-[500]`}>
                {postedBy?.[0]?.name}
              </span>{" "}
              on{" "}
              <span className={`text-[#7820C9] font-[500]`}>
                {moment(note?.date).format("DD MMMM YYYY")}
              </span>
            </span>
          </div>
        </div>
        <span className="block text-[20px] sm:text-[25px] font-[300] text-white text-opacity-90">
          Chapter {note?.chapter}
        </span>
        <span className="block text-[19px] sm:text-[23px] font-[300] text-white text-opacity-90">
          Topic: {note?.topic}
        </span>
        <p className="block text-[16px] sm:text-[18px] text-justify my-4 font-[300] text-white text-opacity-[65%]">
          {note?.description || "No description available."}
        </p>
        <span className="block text-[16px] font-[300] text-white text-opacity-80">
          Issued date: {moment(note?.issuedDate).format("DD MMMM Y")}
        </span>
        <span className="block text-[16px] font-[300] text-white text-opacity-80">
          Due date: {moment(note?.dueDate).format("DD MMMM Y")}
        </span>

        <TitleSM>Files</TitleSM>
        {note?.files?.length > 0 ? (
          note?.files?.map((file) => (
            <Link
              key={file?.id}
              to={`https://drive.google.com/file/d/${file?.id}`}
              target="_blank"
              style={{
                background: "linear-gradient(to right, #2834D2, #7D1FC8)",
              }}
              className={`block max-w-[500px] rounded-md p-[2px] my-2`}
            >
              <div
                className={`bg-[#0E1153] p-3 flex w-full rounded-md flex-row gap-2 items-center justify-between text-[18px] min-h-[80px] text-white text-opacity-70`}
              >
                <div>
                  {file?.name?.length > 36
                    ? file?.name.slice(0, 36) + `...`
                    : file?.name}
                </div>
                <div className="grid grid-cols-1 gap-1 max-w-[70px] text-[16px] font-[400] items-end text-right">
                  <Link
                    to={`https://drive.google.com/file/d/${file?.id}`}
                    target="_blank"
                  >
                    View
                  </Link>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <NoDataText>No files were provided for this note.</NoDataText>
        )}
        <Comments
          comments={note?.comments}
          id={note?._id}
          refetch={noteRefetch}
          type={`note`}
        />
      </Container>
    </section>
  );
};
export default Note;
