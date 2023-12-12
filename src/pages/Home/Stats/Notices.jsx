import Loader from "../../../components/Loaders/Loader";
import NoDataText from "../../../components/NoData/NoDataText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
// import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import "./vertical-slider.css";
import useTests from "../../../hooks/GET/useTests";

const Notices = () => {
  let tests = useTests(null, 4, true);
  const testsState = tests;
  tests = tests?.data;

  // let location = useLocation();
  // location = location?.pathname || "/";

  return (
    <>
      <span className="text-[18px] xss:text-[20px] sm:text-[25px] text-[#00ECA5] font-[500] block mb-2">
        Notices
      </span>
      {testsState?.isLoading || testsState?.isLoading ? (
        <Loader />
      ) : testsState?.error ? (
        <NoDataText>{testsState?.error || "Failed to get data"}</NoDataText>
      ) : (
        <Swiper
          direction={"vertical"}
          height={60}
          slidesPerGroup={1}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="verticalSlider noticesSlider"
        >
          {tests?.map((test) => (
            <SwiperSlide key={test?._id}>
              <div
                // to={`/test/${test?._id}`}
                // state={location}
                className="text-[16px] xss:text-[18px] sm:text-[19px] text-[#00ECA5] text-opacity-80"
              >
                {test?.subject ? (
                  <>
                    <span className="font-[600]">WT</span> {test?.subject} -
                    Chapter {test?.chapter}
                    <span className="block text-[#00ECA5] text-opacity-60 text-[14px] xss:text-[16px] sm:text-[17px]">
                      on {moment(test?.date).format("DD MMM Y")}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-[400]">{test?.topic}</span>
                    <span className="block text-[#00ECA5] text-opacity-60 text-[14px] xss:text-[16px] sm:text-[17px]">
                      Date: {moment(test?.date).format("DD MMM Y")}
                    </span>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
export default Notices;
