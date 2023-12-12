import { Swiper, SwiperSlide } from "swiper/react";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import useQnA from "../../../hooks/GET/useQnA";
import Container from "../../../layouts/Container/Container";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import Title from "../../../components/Title/Title";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import QnACard from "../../../components/Cards/QnACard/QnACard";
import SeeAllButton from "../../../components/Buttons/SeeAllButton";

const QnA = () => {
  let qnas = useQnA();
  const qnasState = qnas;
  qnas = qnas?.data;

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
    <section className="section bg-[#0A0417]">
      {qnasState?.isLoading ? (
        <LoaderDiv />
      ) : qnasState?.error ? (
        <NoDataText>{qnasState?.error}</NoDataText>
      ) : (
        qnas?.length > 0 && (
          <Container>
            <Title>QnA</Title>
            <div className="px-0 relative w-full max-w-[400px] sm:max-w-[850px] mx-auto">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                modules={[Navigation, Pagination, Autoplay]}
                navigation={false}
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  700: {
                    slidesPerView: qnas?.length > 1 ? 2 : 1,
                    spaceBetween: 25,
                  },
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                className="qnaSwiper"
              >
                {qnas?.map((qna) => (
                  <SwiperSlide key={qna?._id}>
                    <QnACard qna={qna} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Navigation Buttons */}
              <div className="flex flex-row gap-2 items-center justify-end -translate-y-[20px]">
                <button
                  onClick={handlePrevSlide}
                  className={`text-[20px] text-[#9255F5] bg-transparent block disabled:opacity-50 backButton`}
                  disabled={isFirst}
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNextSlide}
                  className={`text-[20px] text-[#9255F5] bg-transparent block disabled:opacity-50 backButton`}
                  disabled={isLast}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
            <SeeAllButton to={`/questions`} className="ml-auto" />
          </Container>
        )
      )}
    </section>
  );
};
export default QnA;
