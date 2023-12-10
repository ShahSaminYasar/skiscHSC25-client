import { Link, useParams } from "react-router-dom";
import useMessagesToAdmin from "../../../hooks/GET/useMessagesToAdmin";
import LoaderPage from "../../../components/Loaders/LoaderPage";
import NoDataText from "../../../components/NoData/NoDataText";
import Container from "../../../layouts/Container/Container";
import BGGFX from "../../../assets/bg-graphics.jpg";
import DPName from "../../../components/ProfileCard/DPName";
import moment from "moment";
import { FaChevronLeft } from "react-icons/fa6";

const AdminMessage = () => {
  const { id } = useParams();

  let message = useMessagesToAdmin(id);

  if (message?.isLoading) return <LoaderPage />;
  if (message?.error)
    return (
      <NoDataText>
        {message?.error || "An error occured, please try again."}
      </NoDataText>
    );

  message = message?.data?.[0];

  return (
    <section className="py-3 w-full">
      <Container className={`w-full`}>
        <Link to={`/dashboard/messages`} className="backButton">
          <FaChevronLeft />
        </Link>
        <div
          style={{
            background: `url(${BGGFX})`,
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            borderRadius: "10px",
            border: "2px solid #6126CB",
          }}
          className="block w-full max-w-md mx-auto my-10"
        >
          <div className="bg-[#6126CB] bg-opacity-40 backdrop-blur-sm rounded-[10px] p-5 text-white text-[18px] flex flex-col gap-3 items-start">
            <DPName
              username={message?.from}
              textStyle="text-[18px] text-white"
            />
            <span>{moment(message?.date).format("DD MMM Y [at] hh:mma")}</span>
            <span>Regarding: {message?.topic}</span>
            <span>{message?.message}</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default AdminMessage;
