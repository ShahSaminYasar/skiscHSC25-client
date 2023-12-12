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

const AddHomework = () => {
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

  const handleAddHomework = async (e) => {
    e.preventDefault();
    setAdding(true);
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
      files: [],
      fileReq: 0,
      issuedDate: moment().format("YYYY-MM-DD"),
      dueDate,
      comments: [],
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
          data.files.push({
            name: upload?.name,
            id: upload?.id,
            approved: true,
            by: user?.username,
            date: moment().format("DD MMM Y [at] hh:mma"),
          })
        );
      } catch (error) {
        setAdding(false);
        console.error(error || "Error");
        return toast(
          error?.message || "Error occured while uploading files",
          "error"
        );
      }
    }

    try {
      const response = await axiosSecure.post("/homeworks", { homework: data });
      const result = response?.data;
      if (result?.message === "success") {
        toast("Homework added", "success");
        setAdding(false);
        queryClient.invalidateQueries({ id: ["getHomeworks"] });
        return navigate("/dashboard/homeworks");
      } else {
        setAdding(false);
        return toast(result?.message || "Failed to post homework", "error");
      }
    } catch (error) {
      setAdding(false);
      console.error(error || "Error");
      return toast(error?.message || "Error occured while POSTing", "error");
    }
  };

  return (
    <section className="pt-[30px] pb-[60px] px-3 bg-[#010313]">
      <Helmet>
        <title>Add Homework | SKISC HSC 2025</title>
      </Helmet>
      <Container>
        <Link to={`/dashboard/homeworks`} className="backButton">
          <FaChevronLeft />
        </Link>
        <Title secondary={true} className="mt-[10px] mb-[20px] my-5">
          Add Homework
        </Title>

        <form
          onSubmit={handleAddHomework}
          className="w-full max-w-[647px] mx-auto flex flex-col gap-[13px]"
        >
          <div>
            <label className="block text-[17px] md:text-[20px] text-white text-opacity-60 mb-2">
              Subject
            </label>
            <input
              type="text"
              style={inputStyle}
              name="subject"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label className="block text-[17px] md:text-[20px] text-white text-opacity-60 mb-2">
              Chapter
            </label>
            <input
              type="text"
              style={inputStyle}
              name="chapter"
              placeholder="Chapter"
              required
            />
          </div>
          <div>
            <label className="block text-[17px] md:text-[20px] text-white text-opacity-60 mb-2">
              Topic
            </label>
            <input
              type="text"
              style={inputStyle}
              name="topic"
              placeholder="Topic"
              required
            />
          </div>
          <div>
            <label className="block text-[17px] md:text-[20px] text-white text-opacity-60 mb-2">
              Description
            </label>
            <textarea
              type="text"
              style={inputStyle}
              name="description"
              placeholder="Description"
              required
              className="min-h-[158px]"
            ></textarea>
          </div>
          <div>
            <label className="block text-[17px] md:text-[20px] text-white text-opacity-60 mb-2">
              Due Date
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
              <input
                type="date"
                className="transition-none text-white bg-transparent"
                defaultValue={moment().add(1, "d").format("YYYY-MM-DD")}
                name="date"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[17px] md:text-[20px] text-white text-opacity-60 mb-2">
              PDF Files (if any)
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
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
            disabled={adding}
          >
            {!adding ? "Add" : <Loader />}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default AddHomework;
