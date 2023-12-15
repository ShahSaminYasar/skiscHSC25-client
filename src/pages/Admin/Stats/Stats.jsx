import { useState } from "react";
import Title from "../../../components/Title/Title";
import moment from "moment";
import useToast from "../../../hooks/Toaster/useToast";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../../components/Loaders/Loader";
import useTests from "../../../hooks/GET/useTests";
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import { Helmet } from "react-helmet";
import { FaCalendarDays } from "react-icons/fa6";
import useCollegeState from "../../../hooks/GET/useCollegeState";
import TitleSM from "../../../components/Title/TitleSM";
import toast from "react-hot-toast";

const Stats = () => {
  const customToast = useToast;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  let tests = useTests();
  const testsState = tests;
  tests = tests?.data;

  let collegeDates = useCollegeState();

  const inputStyle = {
    borderRadius: "8px",
    borderWidth: "2px",
    background: "#0B0F2E",
    fontSize: "20px",
    fontWeight: "400",
    color: "#ffffff",
    width: "100%",
    padding: "8px 12px",
    outline: "none",
    display: "block",
  };

  const [addingTest, setAddingTest] = useState(false);
  const [addingClosedDate, setAddingClosedDate] = useState(false);
  const [addingOpenDate, setAddingOpenDate] = useState(false);

  const handleAddTest = async (e) => {
    e.preventDefault();
    setAddingTest(true);
    const form = e.target;

    try {
      const subject = form?.subject?.value;
      const chapter = form?.chapter?.value;
      const topic = form?.topic?.value;
      const date = form?.date?.value;

      const data = {
        subject,
        chapter,
        topic,
        date,
      };

      const response = await axiosSecure.post("/test", { test: data });
      if (response?.data?.message === "success") {
        queryClient.invalidateQueries({ id: ["getTest"] });
        setAddingTest(false);
        form.subject.value = "";
        form.chapter.value = "";
        form.topic.value = "";
        form.date.value = "";
        return customToast("Test added", "success");
      } else {
        setAddingTest(false);
        return customToast(
          response?.data?.message || "Failed to post test",
          "info"
        );
      }
    } catch (error) {
      setAddingTest(false);
      return customToast(error?.message || "An unknown error occured", "error");
    }
  };

  const handleDeleteTest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The test will be deleted.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, proceed",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/tests?id=${id}`)
          .then((res) => {
            if (res?.data?.message === "success") {
              queryClient.invalidateQueries({ id: ["getTests"] });
              return customToast("Deleted", "success");
            } else {
              Swal.fire({
                title: "Not sure",
                text: res?.data?.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            return customToast(error?.message || "An error occured", "error");
          });
      }
    });
  };

  const handleAddClosedDate = async (e) => {
    e.preventDefault();
    setAddingClosedDate(true);
    const date = e.target.date.value;
    try {
      const response = await axiosSecure.post("/college-state?close=true", {
        date,
      });
      if (response?.data?.message === "success") {
        setAddingClosedDate(false);
        customToast("Date added to closed dates", "success");
        return queryClient.invalidateQueries({ id: ["getCollegeState"] });
      } else {
        setAddingClosedDate(false);
        return customToast(
          response?.data?.message || "Failed to add date",
          "info"
        );
      }
    } catch (error) {
      setAddingClosedDate(false);
      return customToast(error?.message || "An error occured", "error");
    }
  };

  const handleAddOpenDate = async (e) => {
    e.preventDefault();
    setAddingOpenDate(true);
    const date = e.target.date.value;
    try {
      const response = await axiosSecure.post("/college-state?open=true", {
        date,
      });
      if (response?.data?.message === "success") {
        setAddingOpenDate(false);
        customToast("Date added to open dates", "success");
        return queryClient.invalidateQueries({ id: ["getCollegeState"] });
      } else {
        setAddingOpenDate(false);
        return customToast(
          response?.data?.message || "Failed to add date",
          "info"
        );
      }
    } catch (error) {
      setAddingOpenDate(false);
      return customToast(error?.message || "An error occured", "error");
    }
  };

  const handleRemoveDate = async (date, type) => {
    const removingToast = toast.loading("Removing date...", {
      style: {
        background: "#010313",
        border: "2px solid #0CEFE3",
        color: "#0CEFE3",
        fontWeight: 500,
        fontSize: "16px",
      },
    });
    const response = await axiosSecure.delete(
      `/college-state?type=${type}&date=${date}`
    );
    if (response?.data?.message === "success") {
      toast("removed", {
        id: removingToast,
        style: {
          background: "#010313",
          border: "2px solid #0CEFE3",
          color: "#0CEFE3",
          fontWeight: 500,
          fontSize: "16px",
        },
      });
      return queryClient.invalidateQueries({ id: ["getCollegeState"] });
    } else {
      toast.dismiss();
      return customToast(
        response?.data?.message || "Failed. Please try again",
        "error"
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Set Updates | SKISC HSC 2025</title>
      </Helmet>
      <section className="flex flex-col gap-5 bg-[#010313]">
        <div className="p-5 bg-[#020526] rounded-md border-2 border-slate-800 w-full">
          <Title classNmae="flex-1">College Open/Close Date (Special)</Title>
          {/* College open/close */}
          <div className="flex flex-row flex-wrap gap-6 justify-between items-center">
            <form onSubmit={handleAddOpenDate}>
              <label
                htmlFor="subject"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Open Date
              </label>
              <div className="flex flex-row gap-1 items-end flex-wrap text-[16px]">
                <div className="rounded-md p-1 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
                  <input
                    type="date"
                    className="transition-none text-white bg-transparent"
                    name="date"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#552ACD] text-[16px] px-3 py-2 rounded-md font-[400] active:scale-90"
                  disabled={addingOpenDate}
                >
                  {addingOpenDate ? <Loader /> : "Add"}
                </button>
              </div>
            </form>
            <form onSubmit={handleAddClosedDate}>
              <label
                htmlFor="subject"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Closed Date
              </label>
              <div className="flex flex-row gap-1 items-end flex-wrap text-[16px]">
                <div className="rounded-md p-1 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
                  <input
                    type="date"
                    className="transition-none text-white bg-transparent"
                    name="date"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#552ACD] text-[16px] px-3 py-2 rounded-md font-[400] active:scale-90"
                  disabled={addingClosedDate}
                >
                  {addingClosedDate ? <Loader /> : "Add"}
                </button>
              </div>
            </form>
            <button
              onClick={() =>
                document.getElementById(`college_dates_modal`).showModal()
              }
              className="text-white text-[20px]"
            >
              <FaCalendarDays />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-7 w-full overflow-auto">
          <form
            onSubmit={handleAddTest}
            className="p-5 bg-[#020526] rounded-md border-2 border-slate-800 flex flex-col gap-2"
          >
            <Title className="mb-[0px]">Test</Title>
            <div>
              <label
                htmlFor="subject"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Subject
              </label>
              <input
                type="text"
                style={inputStyle}
                name="subject"
                placeholder="Subject"
                className={"border-[#3C3F58]"}
                disabled={addingTest}
              />
            </div>
            <div>
              <label
                htmlFor="chapter"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Chapter
              </label>
              <input
                type="text"
                style={inputStyle}
                name="chapter"
                placeholder="Chapter"
                className={"border-[#3C3F58]"}
                disabled={addingTest}
              />
            </div>
            <div>
              <label
                htmlFor="topic"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Topic
              </label>
              <input
                type="text"
                style={inputStyle}
                name="topic"
                placeholder="Topic"
                className={"border-[#3C3F58]"}
                disabled={addingTest}
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Date
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
            <button
              type="submit"
              className="btn buttonTwo"
              disabled={addingTest}
            >
              {addingTest ? <Loader /> : "Add Test"}
            </button>
          </form>
          {testsState?.isLoading ? (
            <LoaderDiv />
          ) : testsState?.error ? (
            <NoDataText>An error occured while fetching the data.</NoDataText>
          ) : tests?.length > 0 ? (
            <div className="overflow-x-auto w-full max-w-[320px] xss:max-w-[390px] sm:max-w-[500px] md:max-w-[700px]">
              <table className="table">
                {/* head */}
                <thead
                  style={{
                    background:
                      "linear-gradient(91deg, #1E245A 0%, #261053 100%)",
                  }}
                  className="text-[18px] md:text-[19px] text-white font-[300]"
                >
                  <tr>
                    <td className="rounded-l-[5px]">Details</td>
                    <td>Date</td>
                    <td className="rounded-r-[5px] text-center">Actions</td>
                  </tr>
                </thead>
                <tbody className="bg-[#080821]">
                  {tests?.map((test) => (
                    <tr
                      key={test?._id}
                      className="text-white text-opacity-80 font-[300] text-[17px]"
                    >
                      <td className="min-w-[200px]">
                        <div className="text-[16px] opacity-80 mb-1">
                          Subject: {test?.subject || "NULL"}
                        </div>
                        <div className="text-[16px] opacity-80">
                          Chapter: {test?.chapter || "NULL"}
                        </div>
                        <div className="text-[16px] opacity-80 mt-1">
                          Topic: {test?.topic || "Address not provided"}
                        </div>
                      </td>
                      <td className="min-w-[100px]">
                        {moment(test.date).format("DD MMM Y")}
                      </td>
                      <td>
                        <div className="grid grid-cols-1 gap-1 items-center justify-center w-full max-w-[90px] mx-auto">
                          {/* <Link
                            to={`/test/${test?._id}`}
                            className="btn btn-sm font-[400]"
                          >
                            View
                          </Link>
                          <Link
                            to={`/edit-test/${test?._id}`}
                            className="btn btn-sm font-[400]"
                          >
                            Edit
                          </Link> */}
                          <button
                            className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                            onClick={() => handleDeleteTest(test?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataText>No tests have been added.</NoDataText>
          )}
        </div>
      </section>

      <dialog
        id={`college_dates_modal`}
        className="modal bg-gradient-to-br from-[#1c227a93] to-[#5d26cc2a] bg-opacity-50"
      >
        <div className="modal-box bg-[#010313]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="w-full">
            <div>
              <TitleSM className="mt-[0px]">Open</TitleSM>
              <div className="flex flex-col gap-1">
                {collegeDates?.open?.map((date) => (
                  <div
                    key={date}
                    className="text-slate-300 text-[17px] flex flex-row justify-between items-center"
                  >
                    {date}
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveDate(date, "open")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <TitleSM className="mt-[0px]">Closed</TitleSM>
              <div className="flex flex-col gap-1">
                {collegeDates?.close?.map((date) => (
                  <div
                    key={date}
                    className="text-slate-300 text-[17px] flex flex-row justify-between items-center"
                  >
                    {date}
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveDate(date, "close")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default Stats;
