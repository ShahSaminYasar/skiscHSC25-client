import { Link } from "react-router-dom";
import Title from "../../../components/Title/Title";
import NoDataText from "../../../components/NoData/NoDataText";
import moment from "moment";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../../../hooks/Toaster/useToast";
import { Helmet } from "react-helmet";
import useAssignments from "../../../hooks/GET/useAssignments";
import { useEffect } from "react";

const AdminAssignments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let assignments = useAssignments();
  const assignmentsState = assignments;
  assignments = assignments?.data;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const toast = useToast;

  const handleDeleteAssignment = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The assignment will be deleted.",
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, delete",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/assignments?id=${id}`)
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Deleted",
                text: `The assignment document has been deleted.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getAssignments"] });
            } else {
              Swal.fire({
                title: "Not sure",
                text: res?.data?.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            return toast(error?.message || "An error occured", "error");
          });
      }
    });
  };

  return (
    <section className="w-full">
      <Helmet>
        <title>Assignments | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">Assignments</Title>
        <Link to="/add-assignment" className="buttonTwo">
          Add an assignment
        </Link>
      </div>

      {assignmentsState?.isLoading ? (
        <LoaderDiv />
      ) : assignments?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead
              style={{
                background: "linear-gradient(91deg, #1E245A 0%, #261053 100%)",
              }}
              className="text-[18px] md:text-[19px] text-white font-[300]"
            >
              <tr>
                <td className="rounded-l-[5px]">Subject</td>
                <td>Chapter</td>
                <td>Topic</td>
                <td>Dates</td>
                <td>Files</td>
                <td className="rounded-r-[5px] text-center">Actions</td>
              </tr>
            </thead>
            <tbody className="bg-[#080821]">
              {assignments?.map((assignment) => (
                <tr
                  key={assignment?._id}
                  className="text-white text-opacity-80 font-[300] text-[17px]"
                >
                  <td>{assignment?.subject}</td>
                  <td>{assignment?.chapter}</td>
                  <td>{assignment?.topic}</td>
                  <td>
                    S: {moment(assignment?.issuedDate).format("DD MMM Y")}
                    <br />
                    E: {moment(assignment?.dueDate).format("DD MMM Y")}
                  </td>
                  <td>
                    Files: {assignment?.files?.length}
                    <br />
                    Req: {assignment?.fileReq}
                  </td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/assignment/${assignment?._id}`}
                        state={"/dashboard/assignments"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-assignment/${assignment?._id}`}
                        className="btn btn-sm bg-[#261053] hover:bg-[#43257e] text-[#873ace] hover:text-[#dccaff] text-opacity-90 font-[500]"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                        onClick={() => handleDeleteAssignment(assignment?._id)}
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
        <NoDataText>No assignments yet.</NoDataText>
      )}
    </section>
  );
};
export default AdminAssignments;
