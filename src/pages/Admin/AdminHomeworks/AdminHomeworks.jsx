import { Link } from "react-router-dom";
import Title from "../../../components/Title/Title";
import NoDataText from "../../../components/NoData/NoDataText";
import useHomeworks from "../../../hooks/GET/useHomeworks";
import moment from "moment";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../../../hooks/Toaster/useToast";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const AdminHomeworks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let homeworks = useHomeworks();
  const homeworkState = homeworks;
  homeworks = homeworks?.data;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const toast = useToast;

  const handleDeleteHomework = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The homework will be deleted.",
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
          .delete(`/homeworks?id=${id}`)
          .then((res) => {
            if (res?.data?.message === "success") {
              Swal.fire({
                title: "Deleted",
                text: `The homework document has been deleted.`,
                icon: "success",
                background: "#04071F",
              });
              queryClient.invalidateQueries({ id: ["getHomeworks"] });
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
        <title>Homeworks | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">Homeworks</Title>
        <Link to="/add-homework" className="buttonTwo">
          Add a homework
        </Link>
      </div>

      {homeworkState?.isLoading ? (
        <LoaderDiv />
      ) : homeworks?.length > 0 ? (
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
              {homeworks?.map((homework) => (
                <tr
                  key={homework?._id}
                  className="text-white text-opacity-80 font-[300] text-[17px]"
                >
                  <td>{homework?.subject}</td>
                  <td>{homework?.chapter}</td>
                  <td>{homework?.topic}</td>
                  <td>
                    S: {moment(homework?.issuedDate).format("DD MMM Y")}
                    <br />
                    E: {moment(homework?.dueDate).format("DD MMM Y")}
                  </td>
                  <td>
                    Files: {homework?.files?.length}
                    <br />
                    Req: {homework?.fileReq}
                  </td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/homework/${homework?._id}`}
                        state={"/dashboard/homeworks"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-homework/${homework?._id}`}
                        className="btn btn-sm bg-[#261053] hover:bg-[#43257e] text-[#873ace] hover:text-[#dccaff] text-opacity-90 font-[500]"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm bg-[#531019] hover:bg-[#ff2f2f] text-[#ce3a3a] hover:text-[#dccaff] text-opacity-90 font-[500]"
                        onClick={() => handleDeleteHomework(homework?._id)}
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
        <NoDataText>No homeworks yet.</NoDataText>
      )}
    </section>
  );
};
export default AdminHomeworks;
