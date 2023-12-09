import moment from "moment";
import { FaChevronRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const AssignmentCard = ({ assignment }) => {
  let location = useLocation();
  location = location?.pathname || "/assignments";
  const bg = {
    background: "linear-gradient(141deg, #00C2FF -23.57%, #0038FF 98.08%)",
  };
  return (
    <div style={bg} className="rounded-[15px] overflow-hidden p-[2px]">
      <div className="bg-[#050F32] p-5 rounded-[15px] flex flex-col gap-3 text-[#01A4FE]">
        <span className="font-[700] text-[23px] lg:text-[28px] block text-left">
          {assignment?.subject}
        </span>
        <div className="text-[#01A4FE] text-opacity-80 text-[18px] lg:text-[22px] font-[400] flex flex-col items-start gap-0">
          <span>Chapter {assignment?.chapter}</span>
          <span>{assignment?.topic}</span>
        </div>
        <div className="flex flex-row gap-3 justify-between items-center">
          <span className="text-[#01A4FE] text-opacity-90 text-[18px] lg:text-[20px] font-[400]">
            {moment(assignment?.dueDate).format("DD MMM Y")}
          </span>
          <Link
            state={location}
            to={`/assignment/${assignment?._id}`}
            className="toButton assignmentsToButton"
          >
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AssignmentCard;
