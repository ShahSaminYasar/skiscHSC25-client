import { FaAddressCard, FaEnvelope, FaSquarePhone } from "react-icons/fa6";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import Title from "../../../components/Title/Title";
import useAuth from "../../../hooks/Auth/useAuth";
import useUsers from "../../../hooks/GET/useUsers";
import { Link } from "react-router-dom";
import useToast from "../../../hooks/Toaster/useToast";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Admins = () => {
  const admins = useUsers("admin");
  const { user } = useAuth();
  const toast = useToast;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleDismissAdmin = (username) => {
    Swal.fire({
      title: "Are you sure?",
      text: `The user @${username} will be dismissed from admin role.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, dismiss",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/dismiss-admin", { username })
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Dismissed",
                text: `@${username} is no longer an admin.`,
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

  if (admins?.isLoading) return <LoaderDiv />;

  if (!admins || admins?.error)
    return <NoDataText>{admins?.error || "Failed to load admins"}</NoDataText>;

  return (
    <>
      <Title className="mb-[5px]">Admins</Title>
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
              <td className="rounded-r-[5px] text-center">Actions</td>
            </tr>
          </thead>
          <tbody className="bg-[#080821]">
            {admins?.map((admin) => (
              <tr
                key={admin?._id}
                className="text-white text-opacity-80 font-[300] text-[17px]"
              >
                <td className="min-w-[230px]">
                  <div className="flex items-center gap-3">
                    <div className="mask mask-squircle w-[48px] h-[48px]">
                      <img
                        src={
                          admin?.dp ||
                          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        }
                        alt="Admin Avatar"
                      />
                    </div>
                    <div>
                      <div>{admin?.name}</div>
                      <div className="text-[16px] opacity-50">
                        @{admin?.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="min-w-[350px]">
                  <div className="text-[16px] opacity-80 mb-1">
                    <FaEnvelope className="inline-block mt-[-3px] mr-1" />
                    {admin?.email}
                  </div>
                  <div className="text-[16px] opacity-80">
                    <FaSquarePhone className="inline-block mt-[-3px] mr-1" />
                    {admin?.phone}
                  </div>
                  <div className="text-[16px] opacity-80 mt-1">
                    <FaAddressCard className="inline-block mt-[-3px] mr-1" />
                    {admin?.address || "Address not provided"}
                  </div>
                </td>
                <td>{admin?.id || "null"}</td>
                <td>{admin?.roll || "null"}</td>
                <td>
                  <div className="grid grid-cols-1 gap-1 items-center justify-center w-full max-w-[90px] mx-auto">
                    <Link
                      to={`/profile/${admin?.username}`}
                      className="btn btn-sm font-[400]"
                    >
                      Profile
                    </Link>
                    {user?.role === "developer" &&
                      user?.username !== admin?.username && (
                        <button
                          className="btn btn-sm bg-[#FF002E] hover:bg-[#FF002E] text-white text-opacity-90 font-[400] opacity-70 hover:opacity-100"
                          onClick={() => handleDismissAdmin(admin?.username)}
                        >
                          Dismiss
                        </button>
                      )}
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
export default Admins;
