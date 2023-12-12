import moment from "moment";
import useUser from "../../../hooks/GET/useUser";
import Loader from "../../Loaders/Loader";
import useAuth from "../../../hooks/Auth/useAuth";
import useToast from "../../../hooks/Toaster/useToast";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const VoteCard = ({ vote, refetch }) => {
  const by = useUser(vote?.by);
  const { user } = useAuth();
  const customToast = useToast;
  const axiosSecure = useAxiosSecure();

  const [totalVotes, setTotalVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteOpen, setVoteOpen] = useState(true);

  useEffect(() => {
    let hasVoted = false;
    let totalCount = 0;
    vote?.options?.map((option) => {
      let voteCount = option?.votes?.length;
      setTotalVotes((totalCount += voteCount));

      if (option?.votes?.includes(user?.username)) {
        hasVoted = true;
      }
    });
    setVoted(hasVoted);
    setVoteOpen(vote?.status === "active");
  }, [vote, refetch, user?.username]);

  const handleAddVote = async (option) => {
    const votingToast = toast.loading("Adding vote", {
      style: {
        background: "#010313",
        border: "2px solid #0CEFE3",
        color: "#0CEFE3",
        fontWeight: 500,
        fontSize: "16px",
      },
    });
    const data = {
      voteId: vote?._id,
      option,
    };
    try {
      const response = await axiosSecure.put("/votes", data);
      if (response?.data?.message === "success") {
        refetch();
      } else {
        return customToast(
          response?.data?.message || "Couldn't add vote, please try again",
          "error"
        );
      }
      toast.dismiss(votingToast);
    } catch (error) {
      toast.dismiss(votingToast);
      return customToast("An error occured, please try again", "error");
    }
  };

  const handleEndVote = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Votings will be closed.`,
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, close vote",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        const endToast = toast.loading("Processing...", {
          style: {
            background: "#010313",
            border: "2px solid #0CEFE3",
            color: "#0CEFE3",
            fontWeight: 500,
            fontSize: "16px",
          },
        });
        axiosSecure
          .put("/close-vote", { voteId: vote?._id })
          .then((res) => {
            if (res?.data?.message === "success") {
              toast.success("Vote closed", {
                id: endToast,
                style: {
                  background: "#010313",
                  border: "2px solid #0CEFE3",
                  color: "#0CEFE3",
                  fontWeight: 500,
                  fontSize: "16px",
                },
              });
              refetch();
            } else {
              toast.error(res?.data?.message, {
                id: endToast,
                style: {
                  background: "#010313",
                  border: "2px solid #0CEFE3",
                  color: "#0CEFE3",
                  fontWeight: 500,
                  fontSize: "16px",
                },
              });
            }
          })
          .catch((error) => {
            return toast.error(
              error?.message || "An error occured, please try again.",
              {
                id: endToast,
                style: {
                  background: "#010313",
                  border: "2px solid #0CEFE3",
                  color: "#0CEFE3",
                  fontWeight: 500,
                  fontSize: "16px",
                },
              }
            );
          });
      }
    });
  };

  return (
    <div
      className="p-[1px] rounded-[15px] overflow-hidden mb-9 h-fit"
      style={{
        background: "linear-gradient(104deg, #2A34D2 0.79%, #7D1FC8 73.82%)",
      }}
    >
      <div className="bg-[#0D0321] text-white p-5 rounded-[15px] test-[18px] xss:text-[20px] md:text-[22px] flex flex-col gap-3">
        {by?.isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-row items-center gap-2 w-full text-[18px] text-[#0084D1] text-opacity-90">
            <div className="mask mask-squircle w-[28px] h-[28px]">
              <img
                src={
                  by?.[0]?.dp ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                }
                alt="User Profile Picture"
              />
            </div>
            <span>
              By <span className="font-[400]">{by?.[0]?.name}</span> on{" "}
              <span className="font-[400]">
                {moment(vote?.datetime).format("DD MMM Y")}
              </span>
            </span>
          </div>
        )}
        <p className="text-opacity-90 font-[400]">{vote?.title}</p>
        {vote?.options?.map((option) => {
          let voteCount = option?.votes?.length;
          let percentage = (voteCount / totalVotes) * 100 || 0;
          return (
            <div
              key={option?.option}
              style={{
                background:
                  "linear-gradient(104deg, #2A34D2 0.79%, #7D1FC8 73.82%)",
              }}
              className={`p-[1px] rounded-[10px] overflow-hidden relative ${
                !voteOpen ? "pointer-events-none opacity-80" : ""
              }`}
            >
              <button
                className={`disabled:opacity-70 px-3 py-[6px] rounded-[10px] text-white text-opacity-80 font-light z-[2] cursor-pointer w-full block ${
                  option?.votes?.includes(user?.username)
                    ? "bg-gradient-to-r from-[#1E245A] to-[#290951] bg-opacity-90"
                    : "bg-[#02051E]"
                }`}
                onClick={() => handleAddVote(option?.option)}
                disabled={!voteOpen}
              >
                {(!voteOpen || voted) && (
                  <div
                    className="absolute bg-white bg-opacity-10 block top-0 left-0 h-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                )}

                <div className="relative z-[1]">{option?.option}</div>

                {(!voteOpen || (voted && totalVotes > 0)) && (
                  <span className="text-opacity-60 absolute right-4 top-1/2 -translate-y-1/2">
                    {parseInt(percentage)}%
                  </span>
                )}
              </button>
            </div>
          );
        })}
        {vote?.by === user?.username && vote?.status === "active" && (
          <button
            className="btn btn-sm bg-red-800 text-white text-opacity-60 w-fit ml-auto"
            onClick={handleEndVote}
          >
            End vote
          </button>
        )}
        {vote?.status === "closed" && (
          <span className="text-[#DE1345] text-[18px] font-[500] block text-center text-opacity-100">
            Voting closed
          </span>
        )}
      </div>
    </div>
  );
};
export default VoteCard;
