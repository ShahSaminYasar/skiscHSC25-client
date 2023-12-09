import moment from "moment";
import { FaChevronRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const NoteCard = ({ note }) => {
  let location = useLocation();
  location = location?.pathname || "/notes";
  const bg = {
    background: "linear-gradient(137deg, #00ECA5 -23.47%, #05AB8D17 110.64%)",
  };
  return (
    <div
      style={bg}
      className="rounded-[15px] overflow-hidden p-[2px] w-full max-w-[340px] mx-auto"
    >
      <div className="bg-[#050E18] p-5 rounded-[15px] flex flex-col gap-3 text-[#00ECA5]">
        <span className="font-[700] text-[23px] lg:text-[28px] block text-left">
          {note?.subject}
        </span>
        <div className="text-[#00ECA5] text-opacity-80 text-[18px] lg:text-[22px] font-[400] flex flex-col items-start gap-0">
          <span>Chapter {note?.chapter}</span>
          <span>{note?.topic}</span>
        </div>
        <div className="flex flex-row gap-3 justify-between items-center">
          <span className="text-[#00ECA5] text-opacity-80 text-[16px] lg:text-[20px] font-[400]">
            @{note?.by}
            <br />
            <span className="text-[#00ECA5] text-opacity-50 text-[15px] block -mt-[2px]">
              {moment(note?.date).format("DD MMM Y")}
            </span>
          </span>
          <Link
            state={location}
            to={`/note/${note?._id}`}
            className="toButton notesToButton"
          >
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NoteCard;
