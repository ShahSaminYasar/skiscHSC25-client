import moment from "moment";
import useAuth from "../../hooks/Auth/useAuth";
import useAxiosSecure from "../../hooks/Axios/useAxiosSecure";
import useToast from "../../hooks/Toaster/useToast";
import TitleSM from "../Title/TitleSM";
import { useState } from "react";
import Comment from "./Comment";

const Comments = ({ type, id, comments, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const toast = useToast;

  const [adding, setAdding] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setAdding(true);
    const form = e.target;
    const comment = form.comment.value;
    const data = {
      by: user?.username,
      datetime: moment().format(),
      comment,
    };
    try {
      const result = await axiosSecure.post("/comments", {
        type,
        id,
        comment: data,
      });
      if (result?.data?.message === "success") {
        setAdding(false);
        form.comment.value = "";
        refetch();
      } else {
        setAdding(false);
        return toast(
          result?.data?.message || "Couldn't add comment, please try again",
          "info"
        );
      }
    } catch (error) {
      setAdding(false);
      return toast(
        error?.message || "Couldn't add comment, please try again",
        "error"
      );
    }
  };

  return (
    <section className="mb-7">
      <TitleSM>Comments</TitleSM>
      <form
        onSubmit={handleAddComment}
        className="w-full flex flex-row justify-between items-center gap-1 text-[18px] text-white text-opacity-80 border-b-2 border-b-slate-800 max-w-3xl mb-5"
      >
        <input
          type="text"
          placeholder="Leave a comment..."
          name="comment"
          required
          className="w-full px-3 py-2 bg-transparent outline-none"
        />
        <button
          type="submit"
          className="btn btn-sm bg-[#02062D] text-white border-none outline-none"
          disabled={adding}
        >
          {adding ? "Adding..." : "Add comment"}
        </button>
      </form>
      <div className="flex flex-col gap-3 items-start">
        {comments?.map((comment) => (
          <Comment
            key={comment?.datetime}
            comment={comment}
            type={type}
            postId={id}
            refetch={refetch}
          />
        ))}
      </div>
    </section>
  );
};
export default Comments;
