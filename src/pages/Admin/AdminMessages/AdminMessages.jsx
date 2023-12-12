import { Helmet } from "react-helmet";
import Title from "../../../components/Title/Title";
import useMessagesToAdmin from "../../../hooks/GET/useMessagesToAdmin";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import moment from "moment";
import { Link } from "react-router-dom";
import DPName from "../../../components/ProfileCard/DPName";
import { useEffect } from "react";

const AdminMessages = () => {
  let messages = useMessagesToAdmin();
  const messagesState = messages;
  messages = messages?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-full bg-[#010313]">
      <Helmet>
        <title>Messages | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">Messages</Title>
      </div>

      {messagesState?.isLoading ? (
        <LoaderDiv />
      ) : messagesState?.error ? (
        <NoDataText>
          {messagesState?.error || "An error occured while fetching the data."}
        </NoDataText>
      ) : messages?.length > 0 ? (
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
                <td className="rounded-l-[5px]">From</td>
                <td>Date Sent</td>
                <td>Regarding</td>
                <td>Message</td>
                <td className="rounded-r-[5px] text-center">Actions</td>
              </tr>
            </thead>
            <tbody className="bg-[#080821]">
              {messages?.map((message) => (
                <tr
                  key={message?._id}
                  className="text-white text-opacity-80 font-[300] text-[17px] text-center"
                >
                  <td className="min-w-[230px]">
                    <DPName
                      username={message?.from}
                      textStyle={`text-[17px] text-left leading-[18px]`}
                    />
                  </td>
                  <td className="min-w-[200px]">
                    {moment(message?.date).format("DD MMM Y [at] hh:mm:ssa")}
                  </td>
                  <td className="min-w-[200px]">{message?.type}</td>
                  <td className="min-w-[200px] text-left">
                    {message?.message?.length > 60
                      ? message?.message?.slice(0, 60) + "..."
                      : message?.message}
                  </td>
                  <td>
                    <div className="grid grid-cols-1 gap-1 max-w-[90px] ml-auto">
                      <Link
                        to={`/dashboard/message/${message?._id}`}
                        state={"/dashboard/messages"}
                        className="btn btn-sm font-[400]"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataText>You haven&apos;t posted anything yet. Post now?</NoDataText>
      )}
    </section>
  );
};
export default AdminMessages;
