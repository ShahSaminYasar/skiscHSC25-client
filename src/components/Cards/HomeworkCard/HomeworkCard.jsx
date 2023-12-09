import moment from "moment";
import { FaChevronRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const HomeworkCard = ({ homework }) => {
  let location = useLocation();
  location = location?.pathname || "/homeworks";
  const bg = {
    background: "linear-gradient(137deg, #7A2AFD -23.47%, #330D71 110.64%)",
  };
  return (
    <div style={bg} className="rounded-[15px] overflow-hidden p-[2px]">
      <div className="bg-[#11072D] p-5 rounded-[15px] flex flex-col gap-3 text-[#9255F5]">
        <span className="font-[700] text-[23px] lg:text-[28px] block text-left">
          {homework?.subject}
        </span>
        <div className="text-[#9255F5] text-opacity-80 text-[18px] lg:text-[22px] font-[400] flex flex-col items-start gap-0">
          <span>Chapter {homework?.chapter}</span>
          <span>{homework?.topic}</span>
        </div>
        <div className="flex flex-row gap-3 justify-between items-center">
          <span className="text-[#9255F5] text-opacity-90 text-[18px] lg:text-[20px] font-[400]">
            {moment(homework?.dueDate).format("DD MMM Y")}
          </span>
          <Link
            state={location}
            to={`/homework/${homework?._id}`}
            className="toButton homeworksToButton"
          >
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomeworkCard;
