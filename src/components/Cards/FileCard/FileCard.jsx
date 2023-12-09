import { Link } from "react-router-dom";
import useUser from "../../../hooks/GET/useUser";
import Loader from "../../Loaders/Loader";
import useAuth from "../../../hooks/Auth/useAuth";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import useToast from "../../../hooks/Toaster/useToast";
import { useState } from "react";

const FileCard = ({ file, parentId, refetch }) => {
  const postedBy = useUser(file?.by);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const toast = useToast;

  const isAdmin = user?.role === "admin" || user?.role === "developer";

  const [approving, setApproving] = useState(false);

  const handleApprove = async () => {
    setApproving(true);
    const fileId = file?.id;
    axiosSecure
      .put("/approve-submission", {
        type: "homework",
        id: parentId,
        fileId,
      })
      .then((result) => {
        setApproving(false);
        if (result?.data?.message === "success") {
          refetch();
          return toast("Approved", "success");
        } else {
          return toast(result?.data?.message, "error");
        }
      })
      .catch((error) => {
        setApproving(false);
        return toast(error?.message || "An error occured", "error");
      });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #2834D2, #7D1FC8)",
      }}
      className={`block max-w-[500px] rounded-md p-[2px] my-2  ${
        !file?.approved ? (!isAdmin ? "hidden" : "block") : "block"
      }`}
      //   to={`https://drive.google.com/file/d/${file.id}`}
      //   target="_blank"
    >
      <div
        className={`bg-[#0E1153] p-3 flex w-full rounded-md flex-row gap-2 items-center justify-between text-[18px]`}
      >
        <div>
          {file?.name?.length > 36
            ? file?.name.slice(0, 36) + `...`
            : file?.name}
          {postedBy?.isLoading ? (
            <Loader />
          ) : postedBy?.error ? (
            <span>{postedBy?.error?.message || "Failed to load user"}</span>
          ) : (
            <div className="mt-3 flex flex-row gap-2 items-center justify-start w-full">
              <div className="mask mask-squircle w-[25px] h-[25px]">
                <img
                  src={
                    postedBy?.[0].dp ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt="User Profile Picture"
                />
              </div>
              <span className="block text-[15px] text-white text-opacity-90">
                {postedBy?.[0]?.name}
                <br />
                <span className="block text-white text-opacity-50 text-[12px] mt-[-5px]">
                  {file?.date}
                </span>
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-1 max-w-[70px] text-[16px] font-[400] items-end text-right">
          <Link
            to={`https://drive.google.com/file/d/${file?.id}`}
            target="_blank"
          >
            View
          </Link>
          {!file?.approved && (
            <button
              className="btn btn-sm bg-green-600 text-white"
              onClick={handleApprove}
              disabled={approving}
            >
              {approving ? <Loader /> : "Approve"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileCard;
