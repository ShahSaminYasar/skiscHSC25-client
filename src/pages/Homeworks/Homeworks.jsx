// TODO: Add pagination
// import { useState } from "react";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import Container from "../../layouts/Container/Container";
import PageBanner from "../../components/PageBanner/PageBanner";
import useHomeworks from "../../hooks/GET/useHomeworks";
import HomeworkCard from "../../components/Cards/HomeworkCard/HomeworkCard";
import { useEffect } from "react";

const Homeworks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [limit, setLimit] = useState(9);
  let homeworks = useHomeworks(null, null);

  if (homeworks?.isLoading) return <LoaderPage />;
  if (homeworks?.error)
    return (
      <NoDataText className="text-red-500">
        {homeworks?.error || "An error occured"}
      </NoDataText>
    );

  homeworks = homeworks?.data;

  return (
    <section className="page">
      <PageBanner>HOMEWORKS</PageBanner>
      <Container
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-5 py-7 px-3 pb-12`}
      >
        {homeworks?.map((homework) => (
          <HomeworkCard key={homework?._id} homework={homework} />
        ))}
      </Container>
    </section>
  );
};
export default Homeworks;
