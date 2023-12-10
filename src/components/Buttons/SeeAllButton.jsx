import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SeeAllButton = ({ to, text, className = "", state }) => {
  const bgGradient = {
    background: "linear-gradient(98deg, #3830D1 7.21%, #7B1FC9 129.14%)",
  };
  return (
    <Link
      to={to}
      style={bgGradient}
      state={state || "/dashboards/my-posts"}
      className={`p-[2px] rounded-[8px] overflow-hidden block mt-11 w-fit ${className}`}
    >
      <div
        className="py-[6px] px-3 text-[18px] font-[400] text-white text-opacity-70 rounded-[8px] flex flex-row items-center gap-1 hover:gap-3"
        style={{
          background: "linear-gradient(98deg, #1E245A 7.21%, #290951 129.14%)",
        }}
      >
        {text || "See all"} <FaArrowRight />
      </div>
    </Link>
  );
};
export default SeeAllButton;
