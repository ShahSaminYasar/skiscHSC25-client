// TODO: Add pagination
// import { useState } from "react";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import Container from "../../layouts/Container/Container";
import PageBanner from "../../components/PageBanner/PageBanner";
import useAssignments from "../../hooks/GET/useAssignments";
import AssignmentCard from "../../components/Cards/AssignmentCard/AssignmentCard";
import { useEffect } from "react";

const Assignments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [limit, setLimit] = useState(9);
  let assignments = useAssignments(null, null);

  if (assignments?.isLoading) return <LoaderPage />;
  if (assignments?.error)
    return (
      <NoDataText className="text-red-500">
        {assignments?.error || "An error occured"}
      </NoDataText>
    );

  assignments = assignments?.data;

  return (
    <section className="page">
      <PageBanner>ASSIGNMENTS</PageBanner>
      <Container
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-5 py-7 px-3 pb-12`}
      >
        {assignments?.map((assignment) => (
          <AssignmentCard key={assignment?._id} assignment={assignment} />
        ))}
      </Container>
    </section>
  );
};
export default Assignments;
