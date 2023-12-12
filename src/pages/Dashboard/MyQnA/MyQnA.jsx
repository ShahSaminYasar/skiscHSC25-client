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
import useAuth from "../../../hooks/Auth/useAuth";
import toast from "react-hot-toast";
import useQnA from "../../../hooks/GET/useQnA";

const MyQnA = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  let qnas = useQnA(user?.username);
  const qnasState = qnas;
  qnas = qnas?.data;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const customToast = useToast;

  const handleDeleteQnA = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The question will be deleted.",
      icon: "warning",
      color: "#535FC6",
      showCancelButton: true,
      confirmButtonColor: "#231856",
      cancelButtonColor: "#01020C",
      confirmButtonText: "Yes, delete",
      background: "#04071F",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading("Deleting", {
          style: {
            background: "#010313",
            border: "2px solid #0CEFE3",
            color: "#0CEFE3",
            fontWeight: 500,
            fontSize: "16px",
          },
        });
        axiosSecure
          .delete(`/qna?id=${id}`)
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Deleted",
                text: `The question has been deleted.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getQnA"] });
              toast.dismiss();
            } else {
              Swal.fire({
                title: "Not sure",
                text: res?.data?.message,
                icon: "error",
                background: "#04071F",
              });
              toast.dismiss();
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
    <section className="w-full bg-[#010313]">
      <Helmet>
        <title>My QnA | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">My QnA</Title>
        <Link to="/add-qna" className="buttonTwo">
          Add a QnA
        </Link>
      </div>

      {qnasState?.isLoading ? (
        <LoaderDiv />
      ) : qnasState?.error ? (
        <NoDataText>
          {qnasState?.error || "An error occured while fetching the data."}
        </NoDataText>
      ) : qnas?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead
              style={{
                background: "linear-gradient(91deg, #1E245A 0%, #261053 100%)",
              }}
              className="text-[18px] md:text-[19px] text-white font-[300] text-center"
            >
              <tr>
                <td className="rounded-l-[5px]">Question</td>
                <td>Answers</td>
                <td className="rounded-r-[5px] text-center">Actions</td>
              </tr>
            </thead>
            <tbody className="bg-[#080821]">
              {qnas?.map((qna) => (
                <tr
                  key={qna?._id}
                  className="text-white text-opacity-80 font-[300] text-[17px] text-center"
                >
                  <td className="min-w-[250px]">
                    {qna?.question?.length > 255
                      ? qna?.question?.slice(0, 255) + "..."
                      : qna?.question}
                  </td>
                  <td>{qna?.answers?.length}</td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/qna/${qna?._id}`}
                        state={"/dashboard/qna"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                        onClick={() => handleDeleteQnA(qna?._id)}
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
        <NoDataText>
          You haven&apos;t posted any qna yet. Post one now?
        </NoDataText>
      )}
    </section>
  );
};
export default MyQnA;
