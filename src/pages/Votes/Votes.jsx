import { Link } from "react-router-dom";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import NoDataText from "../../components/NoData/NoDataText";
import useVotes from "../../hooks/GET/useVotes";
import Container from "../../layouts/Container/Container";
import PageBanner from "../../components/PageBanner/PageBanner";
import VoteCard from "../../components/Cards/VoteCard/VoteCard";
import { Helmet } from "react-helmet";

const Votes = () => {
  let votes = useVotes();
  const votesState = votes;
  const votesRefetch = votes?.refetch;
  votes = votes?.data;

  if (votesState?.isLoading) return <LoaderDiv />;
  if (votesState?.error)
    return (
      <NoDataText>
        {votesState?.error || "An error occured, please refresh the page."}
      </NoDataText>
    );

  if (votes?.length === 0)
    return (
      <NoDataText>
        No votes yet, wanna <Link to={`/add-vote`}>launch one?</Link>
      </NoDataText>
    );

  return (
    <>
      <Helmet>
        <title>Voting Zone | SKISC HSC 2025</title>
      </Helmet>
      <PageBanner>Voting Zone</PageBanner>
      <section className="py-[30px] px-3">
        <Container className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {votes?.map((vote) => (
            <VoteCard key={vote?._id} vote={vote} refetch={votesRefetch} />
          ))}
        </Container>
      </section>
    </>
  );
};
export default Votes;
