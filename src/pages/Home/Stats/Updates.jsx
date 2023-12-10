import Loader from "../../../components/Loaders/Loader";
import NoDataText from "../../../components/NoData/NoDataText";
import usePosts from "../../../hooks/GET/usePosts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import "./vertical-slider.css";
import useTests from "../../../hooks/GET/useTests";

const Updates = () => {
  let posts = usePosts(null, null, false, 3);
  const postsState = posts;
  posts = posts?.data;

  let tests = useTests(null, 4, true);
  const testsState = tests;
  tests = tests?.data;

  let location = useLocation();
  location = location?.pathname || "/";

  return (
    <>
      <span className="text-[18px] xss:text-[20px] sm:text-[25px] text-[#34BCD4] font-[500] block mb-2">
        Updates
      </span>
      {postsState?.isLoading || testsState?.isLoading ? (
        <Loader />
      ) : postsState?.error ? (
        <NoDataText>{postsState?.error || "Failed to get data"}</NoDataText>
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
          className="verticalSlider updatesSlider"
        >
          {posts?.map((post) => (
            <SwiperSlide key={post?._id}>
              <Link
                to={`/post/${post?._id}`}
                state={location}
                className="text-[16px] xss:text-[18px] sm:text-[19px] text-[#34BCD4] text-opacity-80"
              >
                @{post?.by} made a new post
                <span className="block text-[#34BCD4] text-opacity-60 text-[14px] xss:text-[16px] sm:text-[17px]">
                  {moment().format("DD MMM Y") ===
                  moment(post?.date).format("DD MMM Y")
                    ? moment(post?.date).format("[Today] [at] hh:mma")
                    : moment(post?.date).format("DD MMM Y [at] hh:mma")}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
export default Updates;
