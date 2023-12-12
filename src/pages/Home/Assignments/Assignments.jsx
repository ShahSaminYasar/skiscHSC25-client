import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import Title from "../../../components/Title/Title";
import Container from "../../../layouts/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import useAssignments from "../../../hooks/GET/useAssignments";
import AssignmentCard from "../../../components/Cards/AssignmentCard/AssignmentCard";
import SeeAllButton from "../../../components/Buttons/SeeAllButton";

const Assignments = () => {
  let assignments = useAssignments(null, 4, true);
  const assignmentsState = assignments;
  assignments = assignments?.data;

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
    <section className="section bg-[#030A1F]">
      <Container>
        <Title>Assignments</Title>
        {assignmentsState?.isLoading ? (
          <LoaderDiv />
        ) : assignmentsState?.error ? (
          <NoDataText className="text-red-500">
            {assignmentsState?.error}
          </NoDataText>
        ) : (
          <>
            <div className="px-0 flex flex-row gap-1 justify-between items-center">
              <button
                onClick={handlePrevSlide}
                className={`text-[20px] text-[#01A4FE] bg-transparent block lg:hidden disabled:opacity-50`}
                disabled={isFirst}
              >
                <FaChevronLeft />
              </button>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  600: {
                    slidesPerView: assignments?.length > 1 ? 2 : 1,
                    spaceBetween: 10,
                  },
                  710: {
                    slidesPerView:
                      assignments?.length > 2
                        ? 3
                        : assignments?.length > 1
                        ? 2
                        : 1,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView:
                      assignments?.length > 3
                        ? 4
                        : assignments?.length > 2
                        ? 3
                        : assignments?.length > 1
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
                {assignments?.map((assignment) => (
                  <SwiperSlide key={assignment?._id}>
                    <AssignmentCard assignment={assignment} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={handleNextSlide}
                className={`text-[20px] text-[#01A4FE] bg-transparent block lg:hidden disabled:opacity-50`}
                disabled={isLast}
              >
                <FaChevronRight />
              </button>
            </div>
            <SeeAllButton to={`/assignments`} className="ml-auto" />
          </>
        )}
      </Container>
    </section>
  );
};
export default Assignments;
