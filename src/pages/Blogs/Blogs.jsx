import { Helmet } from "react-helmet";
import PostCard from "../../components/Cards/PostCard/PostCard";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import PageBanner from "../../components/PageBanner/PageBanner";
import usePosts from "../../hooks/GET/usePosts";
import Container from "../../layouts/Container/Container";

const Blogs = () => {
  let posts = usePosts(null, null, false);
  const postsState = posts;
  posts = posts?.data;

  return (
    <section className="page">
      <Helmet>
        <title>Blogs | SKISC HSC 2025</title>
      </Helmet>
      <PageBanner>BLOG</PageBanner>
      {postsState?.isLoading ? (
        <LoaderPage />
      ) : postsState?.error ? (
        <NoDataText className="text-red-500">{postsState?.error}</NoDataText>
      ) : (
        <Container
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-5 py-7 px-3 pb-12`}
        >
          {posts?.map((post) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </Container>
      )}
    </section>
  );
};
export default Blogs;
