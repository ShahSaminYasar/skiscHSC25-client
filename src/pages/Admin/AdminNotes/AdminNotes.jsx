import { Link } from "react-router-dom";
import Title from "../../../components/Title/Title";
import NoDataText from "../../../components/NoData/NoDataText";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../../../hooks/Toaster/useToast";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import useNotes from "../../../hooks/GET/useNotes";
import moment from "moment";
import toast from "react-hot-toast";

const AdminNotes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let notes = useNotes(null, null, null, true);
  const notesState = notes;
  notes = notes?.data;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const customToast = useToast;

  const handleBlockNote = async (id, approved) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The note will be ${approved ? "blocked" : "unblocked"}.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, proceed",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading(`${approved ? "Blocking" : "Unblocking"}`, {
          style: {
            background: "#010313",
            border: "2px solid #0CEFE3",
            color: "#0CEFE3",
            fontWeight: 500,
            fontSize: "16px",
          },
        });
        axiosSecure
          .put(`/notes?block=true`, { id })
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: `${approved ? "Blocked" : "Unblocked"}`,
                text: `The note has been ${
                  approved ? "blocked" : "unblocked"
                }.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getNotes"] });
              toast.dismiss();
            } else {
              toast.dismiss();
              Swal.fire({
                title: "Not sure",
                text: res?.data?.message,
                icon: "error",
                background: "#04071F",
              });
            }
          })
          .catch((error) => {
            toast.dismiss();
            return customToast(error?.message || "An error occured", "error");
          });
      }
    });
  };

  return (
    <section className="w-full">
      <Helmet>
        <title>All Notes | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">All Notes</Title>
      </div>

      {notesState?.isLoading ? (
        <LoaderDiv />
      ) : notesState?.error ? (
        <NoDataText>
          {notesState?.error || "An error occured while fetching the data."}
        </NoDataText>
      ) : notes?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead
              style={{
                background: "linear-gradient(91deg, #1E245A 0%, #261053 100%)",
              }}
              className="text-[18px] md:text-[19px] text-white font-[300] text-left"
            >
              <tr>
                <td className="rounded-l-[5px]">Data</td>
                <td>By</td>
                <td>Files</td>
                <td>Status</td>
                <td className="rounded-r-[5px] text-center">Actions</td>
              </tr>
            </thead>
            <tbody className="bg-[#080821]">
              {notes?.map((note) => (
                <tr
                  key={note?._id}
                  className="text-white text-opacity-80 font-[300] text-[17px] text-left"
                >
                  <td>
                    Subject: {note?.subject}
                    <br />
                    Chapter: {note?.chapter}
                    <br />
                    Topic: {note?.topic}
                  </td>
                  <td>
                    @{note?.by}
                    <br />
                    <span className="text-white block mt-1 text-opacity-50">
                      {moment(note?.date).format("DD MMM Y")}
                    </span>
                  </td>
                  <td>{note?.files?.length}</td>
                  <td
                    className={
                      note?.approved ? "text-[#3ace89]" : "text-[#ce3a3a]"
                    }
                  >
                    {note?.approved ? "Approved" : "Blocked"}
                  </td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/note/${note?._id}`}
                        state={"/dashboard/notes"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                        onClick={() =>
                          handleBlockNote(note?._id, note?.approved)
                        }
                      >
                        {note?.approved ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataText>
          You haven&apos;t posted any note yet. Post one now?
        </NoDataText>
      )}
    </section>
  );
};
export default AdminNotes;
