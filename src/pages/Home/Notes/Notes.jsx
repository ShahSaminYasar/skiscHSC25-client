import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import Title from "../../../components/Title/Title";
import Container from "../../../layouts/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import useNotes from "../../../hooks/GET/useNotes";
import NoteCard from "../../../components/Cards/NoteCard/NoteCard";

import "swiper/css/effect-coverflow";
import SeeAllButton from "../../../components/Buttons/SeeAllButton";

const Notes = () => {
  let notes = useNotes(null, null, 5);
  const notesState = notes;
  notes = notes?.data;

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
    <section className="section bg-[#030A12]">
      <Container>
        <Title>Notes</Title>
        {notesState?.isLoading ? (
          <LoaderDiv />
        ) : notesState?.error ? (
          <NoDataText className="text-red-500">{notesState?.error}</NoDataText>
        ) : (
          <>
            <div className="px-0 flex flex-row gap-3 justify-between items-center">
              <button
                onClick={handlePrevSlide}
                className={`text-[20px] text-[#00ECA5] bg-transparent block disabled:opacity-50`}
                disabled={isFirst}
              >
                <FaChevronLeft />
              </button>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 110,
                  modifier: 1,
                  slideShadows: false,
                }}
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  900: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay, EffectCoverflow]}
                navigation={false}
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                className="mySwiper"
              >
                {notes?.map((note) => (
                  <SwiperSlide key={note?._id}>
                    <NoteCard note={note} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={handleNextSlide}
                className={`text-[20px] text-[#00ECA5] bg-transparent block disabled:opacity-50`}
                disabled={isLast}
              >
                <FaChevronRight />
              </button>
            </div>
            <SeeAllButton to={`/notes`} />
          </>
        )}
      </Container>
    </section>
  );
};
export default Notes;
