import { Link, useLocation } from "react-router-dom";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import useAssignments from "../../../hooks/GET/useAssignments";
import useHomeworks from "../../../hooks/GET/useHomeworks";

const DueTasks = () => {
  let homeworks = useHomeworks(null, 4, true);
  const homeworksState = homeworks;
  homeworks = homeworks?.data;

  let assignments = useAssignments(null, 4, true);
  const assignmentsState = assignments;
  assignments = assignments?.data;

  let location = useLocation();
  location = location?.pathname || "/";

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="h-full flex flex-col gap-1">
        <span className="text-[18px] xss:text-[20px] sm:text-[25px] text-[#861DC7] font-[500]">
          Homeworks
        </span>
        <div className="pl-2 border-r border-r-white border-opacity-10">
          {homeworksState?.isLoading ? (
            <LoaderDiv />
          ) : homeworksState?.error ? (
            <NoDataText>
              {homeworksState?.error || "Failed to get data"}
            </NoDataText>
          ) : (
            homeworks?.map((homework) => (
              <Link
                to={`/homework/${homework?._id}`}
                state={location}
                key={homework?._id}
                className="block text-[16px] xss:text-[18px] sm:text-[22px] text-white font-[300] leading-[20px] mb-2"
              >
                {homework?.subject}{" "}
                <span className="text-white text-opacity-50 text-[14px] xss:text-[15px] font-[300] inline-block">
                  {homework?.dueDate}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="h-full flex flex-col gap-1">
        <span className="text-[18px] xss:text-[20px] sm:text-[25px] text-[#861DC7] font-[500]">
          Assignments
        </span>
        <div className="pl-2">
          {assignmentsState?.isLoading ? (
            <LoaderDiv />
          ) : assignmentsState?.error ? (
            <NoDataText>
              {assignmentsState?.error || "Failed to get data"}
            </NoDataText>
          ) : (
            assignments?.map((assignment) => (
              <Link
                to={`/assignment/${assignment?._id}`}
                state={location}
                key={assignment?._id}
                className="block text-[16px] xss:text-[18px] sm:text-[22px] text-white font-[300] leading-[20px] mb-2"
              >
                {assignment?.subject}{" "}
                <span className="text-white text-opacity-50 text-[14px] xss:text-[15px] font-[300] inline-block">
                  {assignment?.dueDate}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default DueTasks;
