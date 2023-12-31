import HomeworkCard from "../../../components/Cards/HomeworkCard/HomeworkCard";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import Title from "../../../components/Title/Title";
import useHomeworks from "../../../hooks/GET/useHomeworks";
import Container from "../../../layouts/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import SeeAllButton from "../../../components/Buttons/SeeAllButton";

const Homeworks = () => {
  let homeworks = useHomeworks(null, 4, true);
  const homeworksState = homeworks;
  homeworks = homeworks?.data;

  const swiperRef = useRef(null);
  const [slideState, setSlideState] = useState({
    isFirst: true,
    isLast: false,
  });

  const handlePrevSlide = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handleSlideChange = (swiper) => {
    setSlideState({
      isFirst: swiper.isBeginning,
      isLast: swiper.isEnd,
    });
  };

  const { isFirst, isLast } = slideState;

  return (
    <section className="section bg-[#01020E]">
      <Container>
        <Title>Homeworks</Title>
        {homeworksState?.isLoading ? (
          <LoaderDiv />
        ) : homeworksState?.error ? (
          <NoDataText className="text-red-500">
            {homeworksState?.error}
          </NoDataText>
        ) : homeworks?.length > 0 ? (
          <>
            <div className="px-0 flex flex-row gap-1 justify-between items-center">
              <button
                onClick={handlePrevSlide}
                className={`text-[20px] text-[#9255F5] bg-transparent block lg:hidden disabled:opacity-50`}
                disabled={isFirst}
              >
                <FaChevronLeft />
              </button>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  600: {
                    slidesPerView: homeworks?.length > 1 ? 2 : 1,
                    spaceBetween: 10,
                  },
                  710: {
                    slidesPerView:
                      homeworks?.length > 2 ? 3 : homeworks?.length > 1 ? 2 : 1,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView:
                      homeworks?.length > 3
                        ? 4
                        : homeworks?.length > 2
                        ? 3
                        : homeworks?.length > 1
                        ? 2
                        : 1,
                    spaceBetween: 10,
                  },
                }}
                modules={[Navigation]}
                navigation={false}
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                className="mySwiper"
              >
                {homeworks?.map((homework) => (
                  <SwiperSlide key={homework?._id}>
                    <HomeworkCard homework={homework} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={handleNextSlide}
                className={`text-[20px] text-[#9255F5] bg-transparent block lg:hidden disabled:opacity-50`}
                disabled={isLast}
              >
                <FaChevronRight />
              </button>
            </div>
            <SeeAllButton to={`/homeworks`} className="ml-auto" />
          </>
        ) : (
          <NoDataText>Wohoo! No upcoming homeworks.</NoDataText>
        )}
      </Container>
    </section>
  );
};
export default Homeworks;
