import moment from "moment";
import useAuth from "../../hooks/Auth/useAuth";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import useToast from "../../hooks/Toaster/useToast";
import User from "./User";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Comment = ({ comment, type, postId, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const toast = useToast;

  const [replying, setReplying] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);

  const handleAddReply = async (e) => {
    e.preventDefault();
    setReplying(true);
    setErrorMessage("");
    setSuccessMessage("");
    const form = e.target;
    const message = form.reply.value;
    const data = {
      by: user?.username,
      datetime: moment().format(),
      reply: message,
    };
    try {
      const response = await axiosSecure.put("/comments", {
        reply: data,
        type: type,
        id: postId,
        commentBy: comment?.by,
        commentDatetime: comment?.datetime,
      });
      if (response?.data?.message === "success") {
        setReplying(false);
        setSuccessMessage("Reply added");
        form.reply.value = "";
        refetch();
      } else {
        setReplying(false);
        setErrorMessage(
          response?.data?.message || "An error occured, please try again."
        );
        return toast(
          response?.data?.message || "Couldn't add comment, please try again",
          "info"
        );
      }
    } catch (error) {
      setReplying(false);
      setErrorMessage("An error occured, please try again.");
      return toast(
        error?.message || "An error occured, please try again",
        "error"
      );
    }
  };
  return (
    <>
      <div className="flex flex-col items-start gap-0">
        <User username={comment?.by} datetime={comment?.datetime} />
        <p className="text-[18px] text-white text-opacity-90">
          {comment?.comment}
        </p>
        <div className="flex flex-row gap-3 items-center justify-between text-[16px] font-[400]">
          {comment?.replies?.length > 0 && (
            <button
              className="text-[#7820C9] flex flex-row items-center gap-1"
              onClick={() => setReplyOpen((prev) => !prev)}
            >
              Replies{" "}
              <FaChevronDown
                className={`text-[13px duration-75 ${
                  replyOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
          <button
            className="text-[#ffffff] text-opacity-70"
            onClick={() => {
              setErrorMessage("");
              setSuccessMessage("");
              document
                .getElementById(`reply_modal_form_${comment.datetime}`)
                .showModal();
            }}
          >
            Reply
          </button>
        </div>
        {comment?.replies?.length > 0 && (
          <div
            className={`pl-4 mt-2 flex flex-col gap-2 items-start overflow-hidden ${
              !replyOpen ? "h-0" : "h-fit"
            }`}
          >
            {comment?.replies?.map((reply) => (
              <div key={reply?.datetime}>
                <User username={reply?.by} datetime={reply?.datetime} />
                <p className="text-[18px] text-white text-opacity-90">
                  {reply?.reply}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <dialog
        id={`reply_modal_form_${comment.datetime}`}
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
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              Add a reply
            </label>
            <form
              onSubmit={handleAddReply}
              className="rounded-md p-3 text-[17px] w-full"
            >
              <input
                type="text"
                required
                name="reply"
                className="border-b-[2px] border-b-slate-600 outline-none text-white bg-transparent w-full"
                placeholder="Type here..."
              />
              <button
                type="submit"
                className="btn btn-sm bg-slate-700 text-white block w-fit ml-auto mt-2"
                disabled={replying}
              >
                {!replying ? "Add" : "Replying..."}
              </button>
            </form>
            <p className="text-[17px] text-green-500 block text-left">
              {successMessage}
            </p>
            <p className="text-[17px] text-red-500 block text-left">
              {errorMessage}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default Comment;
