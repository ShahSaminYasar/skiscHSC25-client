import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import useUsers from "../../../hooks/GET/useUsers";
import useToast from "../../../hooks/Toaster/useToast";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import Title from "../../../components/Title/Title";
import NoDataText from "../../../components/NoData/NoDataText";
import { FaAddressCard, FaEnvelope, FaSquarePhone } from "react-icons/fa6";

const Waiting = () => {
  const requests = useUsers("student", false);
  const axiosSecure = useAxiosSecure();
  const toast = useToast();

  const queryClient = useQueryClient();

  if (requests?.isLoading) return <LoaderDiv />;

  if (requests?.error) return <NoDataText>{requests?.error}</NoDataText>;

  if (!requests || requests?.length === 0) return;

  const handleApprove = (username) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The user @${username} will be granted access into this website.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, approve",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/approve", { username })
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Approved",
                text: `@${username} has been approved.`,
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

  return (
    <>
      <div className="my-[25px]"></div>

      <Title className="mb-[5px]">Waiting</Title>
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
            {requests?.map((request) => (
              <tr
                key={request?._id}
                className="text-white text-opacity-80 font-[300] text-[17px]"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="mask mask-squircle w-[48px] h-[48px]">
                      <img
                        src={
                          request?.dp ||
                          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        }
                        alt="User Avatar"
                      />
                    </div>
                    <div>
                      <div>{request?.name}</div>
                      <div className="text-[16px] opacity-50">
                        @{request?.username || "NOT SUBMITTED"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-[16px] opacity-80 mb-1">
                    <FaEnvelope className="inline-block mt-[-3px] mr-1" />
                    {request?.email}
                  </div>
                  <div className="text-[16px] opacity-80">
                    <FaSquarePhone className="inline-block mt-[-3px] mr-1" />
                    {request?.phone || "NOT SUBMITTED"}
                  </div>
                  <div className="text-[16px] opacity-80 mt-1">
                    <FaAddressCard className="inline-block mt-[-3px] mr-1" />
                    {request?.address || "Address not provided"}
                  </div>
                </td>
                <td>{request?.id || "null"}</td>
                <td>{request?.roll || "null"}</td>
                <td
                  className={
                    request?.verified ? "text-[#3ace89]" : "text-[#ce3a3a]"
                  }
                >
                  {request?.verified ? "Verified" : "Waiting"}
                </td>
                <td>
                  <div className="grid grid-cols-1 gap-1 items-center justify-center w-full max-w-[90px] mx-auto">
                    <button
                      className="btn btn-sm bg-[#10533d] hover:bg-[#257e60] text-[#3ace89] hover:text-[#dccaff] text-opacity-90 font-[500]"
                      disabled={!request?.username}
                      onClick={() => handleApprove(request?.username)}
                    >
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Waiting;
