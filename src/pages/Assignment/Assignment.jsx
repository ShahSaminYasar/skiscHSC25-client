import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { FaChevronLeft } from "react-icons/fa6";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import DetailsPageTitle from "../../components/Title/DetailsPageTitle";
import TitleSM from "../../components/Title/TitleSM";
import { Helmet } from "react-helmet";
import FileCard from "../../components/Cards/FileCard/FileCard";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import Loader from "../../components/Loaders/Loader";
import useAuth from "../../hooks/Auth/useAuth";
import moment from "moment";
import useToast from "../../hooks/Toaster/useToast";
import { useQueryClient } from "@tanstack/react-query";
import useAssignments from "../../hooks/GET/useAssignments";
import Comments from "../../components/Comments/Comments";

const Assignment = () => {
  let location = useLocation();
  location = location?.state || "/dashboard/assignments";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  let assignment = useAssignments(id);
  const assignmentState = assignment;
  const assignmentRefetch = assignment?.refetch;
  assignment = assignment?.data?.[0];
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const toast = useToast;
  const queryClient = useQueryClient();

  const [submitting, setSubmitting] = useState(false);
  const [pdfFiles, setPDFFiles] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isAdmin = user?.role === "admin" || user?.role === "developer";

  useEffect(() => {
    if (assignment?.files) {
      setPDFFiles(assignment?.files);
    }
  }, [assignment, assignment?.files]);

  if (assignmentState?.isLoading) return <LoaderPage />;
  if (assignmentState?.error)
    return <NoDataText>{assignmentState?.error}</NoDataText>;
  if (!assignment) return <Navigate to="/assignments" />;

  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Form
    const form = e.target;
    // Form Inputs
    const files = form?.pdf?.files;
    // The data object
    const data = {
      subject: assignment?.subject,
      chapter: assignment?.chapter,
      topic: assignment?.topic,
      description: assignment?.description,
      files: pdfFiles,
      fileReq: isAdmin ? assignment?.fileReq : assignment?.fileReq + 1,
      issuedDate: assignment?.issuedDate,
      dueDate: assignment?.dueDate,
      comments: assignment?.comments,
    };
    // Upload the files to Google Drive (if provided)
    if (files.length > 0) {
      // Make a FormData
      const formData = new FormData();
      // Append each file to the FormData
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      // Send the FormData to backend to upload to Google Drive
      try {
        const response = await axiosSecure.post("/upload-to-drive", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = await response.data.result;
        result.map((upload) =>
          pdfFiles.push({
            name: upload?.name,
            id: upload?.id,
            approved: user?.role === "admin" || user?.role === "developer",
            by: user?.username,
            date: moment().format("DD MMM Y [at] hh:mma"),
          })
        );
      } catch (error) {
        setSubmitting(false);
        setErrorMsg("Error occured while uploading file");
        console.error(error || "Error");
        return toast(
          error?.message || "Error occured while uploading file",
          "error"
        );
      }
    }

    try {
      const response = await axiosSecure.put("/assignments", {
        id: id,
        assignment: data,
      });
      const result = response?.data;
      if (result?.message === "success") {
        setSuccessMsg("Solution submitted for approval");
        toast("Solution submitted for approval", "success");
        setSubmitting(false);
        queryClient.invalidateQueries({ id: ["getAssignments"] });
      } else {
        setSubmitting(false);
        setErrorMsg("Failed to submit solution");
        return toast(result?.message || "Failed to submit solution", "error");
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error || "Error");
      setErrorMsg("Error occured while PUTing");
      return toast(error?.message || "Error occured while PUTing", "error");
    }
  };

  return (
    <section className="section bg-[#010313]">
      <Helmet>
        <title>{assignment?.subject || ""} Assignment | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
          <Link to={location} className="backButton">
            <FaChevronLeft />
          </Link>
          <button
            className="btn buttonTwo"
            onClick={() =>
              document.getElementById("solution_submit").showModal()
            }
            disabled={user?.banned}
          >
            Add a solution
          </button>
        </div>
        <DetailsPageTitle type={"assignment"}>
          {assignment?.subject}
        </DetailsPageTitle>
        <span className="block text-[20px] sm:text-[25px] font-[300] text-white text-opacity-90">
          Chapter {assignment?.chapter}
        </span>
        <span className="block text-[19px] sm:text-[23px] font-[300] text-white text-opacity-90">
          Topic: {assignment?.topic}
        </span>
        <p className="block text-[16px] sm:text-[18px] text-justify my-4 font-[300] text-white text-opacity-[65%]">
          {assignment?.description || "No description available."}
        </p>
        <span className="block text-[16px] font-[300] text-white text-opacity-80">
          Issued date: {moment(assignment?.issuedDate).format("DD MMMM Y")}
        </span>
        <span className="block text-[16px] font-[300] text-white text-opacity-80">
          Due date: {moment(assignment?.dueDate).format("DD MMMM Y")}
        </span>

        <TitleSM>Files</TitleSM>
        {assignment?.files?.length > 0 ? (
          assignment?.files?.map((file) => (
            <FileCard
              file={file}
              parentId={id}
              refetch={assignmentState?.refetch}
              key={file?.id}
            />
          ))
        ) : (
          <NoDataText>No files yet. Feel free to submit a solution.</NoDataText>
        )}

        <Comments
          comments={assignment?.comments}
          id={assignment?._id}
          refetch={assignmentRefetch}
          type={"assignment"}
        />
      </Container>

      <dialog
        id="solution_submit"
        className="modal bg-gradient-to-br from-[#1c227a93] to-[#5d26cc2a] bg-opacity-50 backdrop-blur-sm"
      >
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              PDF Files (if any)
            </label>
            <form
              onSubmit={handleSubmitSolution}
              className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]"
            >
              <input
                type="file"
                className="transition-none text-white bg-transparent"
                name="pdf"
                accept=".pdf"
                required
              />
              <button type="submit" disabled={submitting}>
                {submitting ? <Loader /> : "Submit"}
              </button>
              <p className="text-green-500">{successMsg}</p>
              <p className="text-red-500">{errorMsg}</p>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};
export default Assignment;
