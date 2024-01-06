import { FaChevronLeft } from "react-icons/fa6";
import Container from "../../../layouts/Container/Container";
import Title from "../../../components/Title/Title";
import useAxiosPublic from "../../../hooks/Axios/useAxiosPublic";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loaders/Loader";
import useToast from "../../../hooks/Toaster/useToast";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHomeworks from "../../../hooks/GET/useHomeworks";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import NoDataText from "../../../components/NoData/NoDataText";
import LoaderPage from "../../../components/Loaders/LoaderPage";
import useAuth from "../../../hooks/Auth/useAuth";
import moment from "moment";
import { Helmet } from "react-helmet";

const EditHomework = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const toast = useToast;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let homework = useHomeworks(id);
  const homeworkState = homework;
  homework = homework?.data?.[0];
  const { user } = useAuth();

  const [updating, setUpdating] = useState(false);
  const [pdfFiles, setPDFFiles] = useState([]);

  useEffect(() => {
    if (homework?.files) {
      setPDFFiles(homework?.files);
    }
  }, [homework, homework?.files]);

  if (homeworkState?.isLoading) return <LoaderPage />;
  if (homeworkState?.error)
    return (
      <NoDataText>
        {homeworkState?.error ||
          "An error occured. Please refresh and try again."}
      </NoDataText>
    );

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

  const handleUpdateHomework = async (e) => {
    e.preventDefault();
    setUpdating(true);
    // Form
    const form = e.target;
    // Form Inputs
    const subject = form.subject.value;
    const chapter = form.chapter.value;
    const topic = form.topic.value;
    const description = form.description.value;
    const dueDate = form.date.value;
    const files = form.pdf.files;
    // The data object
    const data = {
      subject,
      chapter,
      topic,
      description,
      files: pdfFiles,
      fileReq: homework?.fileReq,
      issuedDate: homework?.issuedDate,
      dueDate,
      comments: homework?.comments,
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
        const response = await axiosPublic.post("/upload-to-drive", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = await response.data.result;
        result.map((upload) =>
          pdfFiles.push({
            name: upload?.name,
            id: upload?.id,
            approved: true,
            by: user?.username,
            date: moment().format("DD MMM Y [at] hh:mma"),
          })
        );
      } catch (error) {
        setUpdating(false);
        console.error(error || "Error");
        return toast(
          error?.message || "Error occured while uploading files",
          "error"
        );
      }
    }

    try {
      const response = await axiosSecure.put("/homeworks", {
        id: id,
        homework: data,
      });
      const result = response?.data;
      if (result?.message === "success") {
        toast("Homework updated", "success");
        setUpdating(false);
        queryClient.invalidateQueries({ id: ["getHomeworks"] });
        return navigate("/dashboard/homeworks");
      } else {
        setUpdating(false);
        return toast(result?.message || "Failed to update homework", "error");
      }
    } catch (error) {
      setUpdating(false);
      console.error(error || "Error");
      return toast(error?.message || "Error occured while PUTing", "error");
    }
  };

  const handleRemoveFile = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The file ${name} will be deleted.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, delete",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        setPDFFiles(pdfFiles.filter((file) => file.id !== id));
      }
    });
  };

  return (
    <section className="pt-[30px] pb-[60px] px-3 bg-[#010313]">
      <Helmet>
        <title>Edit Homework | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <Link to={`/dashboard/homeworks`} className="backButton">
          <FaChevronLeft />
        </Link>
        <Title secondary={true} className="mt-[10px] mb-[20px] my-5">
          Edit Homework
        </Title>

        <form
          onSubmit={handleUpdateHomework}
          className="w-full max-w-[647px] mx-auto flex flex-col gap-[13px]"
        >
          <input
            type="text"
            style={inputStyle}
            name="subject"
            placeholder="Subject"
            required
            defaultValue={homework?.subject}
          />
          <input
            type="text"
            style={inputStyle}
            name="chapter"
            placeholder="Chapter"
            required
            defaultValue={homework?.chapter}
          />
          <input
            type="text"
            style={inputStyle}
            name="topic"
            placeholder="Topic"
            required
            defaultValue={homework?.topic}
          />
          <textarea
            type="text"
            style={inputStyle}
            name="description"
            placeholder="Description"
            required
            className="min-h-[158px]"
            defaultValue={homework?.description}
          ></textarea>
          <div>
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              Due Date
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
              <input
                type="date"
                className="transition-none text-white bg-transparent"
                defaultValue={homework?.dueDate}
                name="date"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              PDF Files
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
              <ul className="pl-5 text-[#521fc8] pr-2">
                {pdfFiles?.map((file) => (
                  <li
                    key={file?.id}
                    className="flex flex-row items-center gap-3 flex-wrap last:pb-3"
                  >
                    {file?.name}{" "}
                    <button
                      type="button"
                      className="text-red-500 font-400"
                      onClick={() => handleRemoveFile(file?.id, file?.name)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="file"
                className="transition-none text-white bg-transparent"
                name="pdf"
                accept=".pdf"
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
export default EditHomework;
