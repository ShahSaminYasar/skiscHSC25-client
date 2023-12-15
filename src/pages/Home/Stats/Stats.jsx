import { useEffect, useState } from "react";
import Loader from "../../../components/Loaders/Loader";
import NoDataText from "../../../components/NoData/NoDataText";
import useCollegeState from "../../../hooks/GET/useCollegeState";
import Container from "../../../layouts/Container/Container";
import DueTasks from "./DueTasks";
import Notices from "./Notices";
import Updates from "./Updates";
import moment from "moment";

const Stats = () => {
  const collegeState = useCollegeState();

  const [collegeOpen, setCollegeOpen] = useState(true);
  const [today, setToday] = useState(true);
  // console.log("Hour: ", moment().hour());

  useEffect(() => {
    if (collegeState?.isLoading || collegeState?.error) return;
    if (moment().hour() <= 13) {
      setToday(true);
      const today = moment().day();
      if (today === 5 || today === 6) {
        const check = collegeState.open.includes(moment().format("YYYY-MM-DD"));
        if (check) {
          setCollegeOpen(true);
        } else {
          setCollegeOpen(false);
        }
      } else {
        const check = collegeState.close.includes(
          moment().format("YYYY-MM-DD")
        );
        if (check) {
          setCollegeOpen(false);
        } else {
          setCollegeOpen(true);
        }
      }
    } else {
      setToday(false);
      const tomorrow = moment().add(1, "d").day();
      if (tomorrow === 5 || tomorrow === 6) {
        const check = collegeState.open.includes(
          moment().add(1, "d").format("YYYY-MM-DD")
        );
        if (check) {
          setCollegeOpen(true);
        } else {
          setCollegeOpen(false);
        }
      } else {
        const check = collegeState.close.includes(
          moment().add(1, "d").format("YYYY-MM-DD")
        );
        if (check) {
          setCollegeOpen(false);
        } else {
          setCollegeOpen(true);
        }
      }
    }
  }, [collegeState]);

  return (
    <section className="section bg-[#01020E]">
      {/* Parent Container */}
      <Container>
        <div
          style={{
            background:
              "linear-gradient(122deg, #2642F3 11.28%, #370F5B 95.84%)",
          }}
          className={`p-[1px] rounded-[10px]`}
        >
          <div className="rounded-[10px] bg-[#010313] p-5 grid md:grid-cols-2 gap-5">
            {/* Left Container */}
            <div
              className="p-[1px] rounded-[10px]"
              style={{
                background: "linear-gradient(106deg, #6D24E2 0%, #2C0C61 100%)",
              }}
            >
              <div className="bg-[#010313] p-5 rounded-[10px] h-full">
                {collegeState?.isLoading ? (
                  <Loader />
                ) : collegeState?.error ? (
                  <NoDataText>
                    {collegeState?.error ||
                      "An error occured, please refresh the page."}
                  </NoDataText>
                ) : (
                  <span className="text-[18px] sm:text-[22px] font-[400] flex flex-row items-center gap-2 text-white text-opacity-90">
                    <span
                      className={`openStatusAnimation block w-[10px] aspect-square rounded-full ${
                        collegeOpen ? "bg-[#1BD011]" : "bg-[#d01131]"
                      }`}
                    ></span>{" "}
                    College is{" "}
                    <span
                      className={`${
                        collegeOpen ? "text-[#1BD011]" : "text-[#d01131]"
                      } font-[500]`}
                    >
                      {collegeOpen ? "open" : "off"}
                    </span>{" "}
                    {today ? "today" : "tomorrow"}
                  </span>
                )}
                <span className="text-[25px] font-[500] text-[#da1438] block mt-2 mb-1">
                  Due Tasks
                </span>
                <DueTasks />
              </div>
            </div>
            {/* Right Container */}
            <div className="grid grid-cols-1 grid-rows-2 gap-5">
              {/* Right Top Container */}
              <div
                className="p-[1px] rounded-[10px]"
                style={{
                  background:
                    "linear-gradient(141deg, #00C2FF -23.57%, #001B75 98.08%)",
                }}
              >
                <div className="bg-[#010313] p-5 rounded-[10px] w-full h-full">
                  <Updates />
                </div>
              </div>
              {/* Right Bottom Container */}
              <div
                className="p-[1px] rounded-[10px]"
                style={{
                  background:
                    "linear-gradient(137deg, #00ECA5 -23.46%, #01161B 116.3%)",
                }}
              >
                <div className="bg-[#010313] p-5 rounded-[10px] w-full h-full">
                  <Notices />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Stats;
