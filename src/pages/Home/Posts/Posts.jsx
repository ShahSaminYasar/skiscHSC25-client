import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import Title from "../../../components/Title/Title";
import Container from "../../../layouts/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import SeeAllButton from "../../../components/Buttons/SeeAllButton";
import usePosts from "../../../hooks/GET/usePosts";
import PostCardLG from "../../../components/Cards/PostCardLG/PostCardLG";

const Posts = () => {
  let posts = usePosts(null, null, false, 5);
  const postsState = posts;
  posts = posts?.data;

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

  return (
    <section className="section bg-[#0A0417]">
      <Container>
        <Title>Posts</Title>
        {postsState?.isLoading ? (
          <LoaderDiv />
        ) : postsState?.error ? (
          <NoDataText className="text-red-500">{postsState?.error}</NoDataText>
        ) : (
          <>
            <div className="px-0 relative w-full max-w-[400px] sm:max-w-[850px] mx-auto">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                modules={[Navigation, Pagination, Autoplay]}
                navigation={false}
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                className="mySwiper"
              >
                {posts?.map((post) => (
                  <SwiperSlide key={post?._id}>
                    <PostCardLG
                      post={post}
                      slideState={slideState}
                      handleNextSlide={handleNextSlide}
                      handlePrevSlide={handlePrevSlide}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <SeeAllButton to={`/blog`} className="ml-auto" />
          </>
        )}
      </Container>
    </section>
  );
};
export default Posts;
