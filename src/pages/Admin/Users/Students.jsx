import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import useAuth from "../../../hooks/Auth/useAuth";
import useUsers from "../../../hooks/GET/useUsers";
import { Link } from "react-router-dom";
import useToast from "../../../hooks/Toaster/useToast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { FaAddressCard, FaEnvelope, FaSquarePhone } from "react-icons/fa6";

const Students = () => {
  const students = useUsers("student", true);
  const { user } = useAuth();
  const toast = useToast;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleMakeAdmin = (username) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The user @${username} will be promoted to admin.`,
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
          .post("/make-admin", { username })
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Promoted",
                text: `@${username} is now an admin.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getUsers"] });
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

  const handleBan = (username, isBanned) => {
    Swal.fire({
      title: "Are you sure?",
      text: `@${username} will be ${isBanned ? "unbanned" : "banned"}`,
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
          .post("/ban", { username, isBanned })
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: isBanned ? "Unbanned" : "Banned",
                text: `@${username} has been ${
                  isBanned ? "unbanned" : "banned"
                }`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getUsers"] });
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

  if (students?.isLoading) return <LoaderDiv />;

  if (students?.error) return <NoDataText>{students?.error}</NoDataText>;

  if (!students || students?.length === 0)
    return <NoDataText>There are no students currently.</NoDataText>;

  return (
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
            <td className="rounded-l-[5px]">Identity</td>
            <td>Contact</td>
            <td>ID</td>
            <td>Roll</td>
            <td>Status</td>
            <td className="rounded-r-[5px] text-center">Actions</td>
          </tr>
        </thead>
        <tbody className="bg-[#080821]">
          {students?.map((student) => (
            <tr
              key={student?._id}
              className="text-white text-opacity-80 font-[300] text-[17px]"
            >
              <td className="min-w-[230px]">
                <div className="w-full flex items-center gap-3">
                  <div className="mask mask-squircle w-[48px] h-[48px]">
                    <img
                      src={
                        student?.dp ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      }
                      alt="Student Avatar"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div>
                    <div>{student?.name}</div>
                    <div className="text-[16px] opacity-50">
                      @{student?.username || "NOT SUBMITTED"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="min-w-[350px]">
                <div className="text-[16px] opacity-80 mb-1">
                  <FaEnvelope className="inline-block mt-[-3px] mr-1" />
                  {student?.email}
                </div>
                <div className="text-[16px] opacity-80">
                  <FaSquarePhone className="inline-block mt-[-3px] mr-1" />
                  {student?.phone}
                </div>
                <div className="text-[16px] opacity-80 mt-1">
                  <FaAddressCard className="inline-block mt-[-3px] mr-1" />
                  {student?.address || "Address not provided"}
                </div>
              </td>
              <td>{student?.id || "null"}</td>
              <td>{student?.roll || "null"}</td>
              <td
                className={
                  student?.banned
                    ? "text-[#ce3a3a]"
                    : student?.verified
                    ? "text-[#3ace89]"
                    : "text-[#ce3a3a]"
                }
              >
                {student?.banned
                  ? "Banned"
                  : student?.verified
                  ? "Verified"
                  : "Waiting"}
              </td>
              <td>
                <div className="grid grid-cols-1 gap-1 items-center justify-center w-full max-w-[90px] mx-auto">
                  <Link
                    to={`/profile/${student?.username}`}
                    className="btn btn-sm font-[400]"
                    disabled={!student?.verified}
                  >
                    Profile
                  </Link>
                  {user?.role === "developer" && (
                    <button
                      className="btn btn-sm bg-[#261053] hover:bg-[#43257e] text-[#873ace] hover:text-[#dccaff] text-opacity-90 font-[500]"
                      onClick={() => handleMakeAdmin(student?.username)}
                      disabled={student?.banned === true}
                    >
                      To Admin
                    </button>
                  )}
                  <button
                    className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                    onClick={() =>
                      handleBan(student?.username, student?.banned)
                    }
                  >
                    {!student?.banned ? "Ban" : "Unban"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Students;
