import { Helmet } from "react-helmet";
import Title from "../../../components/Title/Title";
import { Link } from "react-router-dom";
import NoDataText from "../../../components/NoData/NoDataText";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import useVotes from "../../../hooks/GET/useVotes";
import Container from "../../../layouts/Container/Container";
import VoteCard from "../../../components/Cards/VoteCard/VoteCard";

const MyVotes = () => {
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
    <section className="w-full bg-[#010313]">
      <Helmet>
        <title>Votes by me | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">Votes by me</Title>
        <Link to="/add-vote" className="buttonTwo">
          Launch a vote
        </Link>
      </div>
      <Container className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
        {votes?.map((vote) => (
          <VoteCard key={vote?._id} vote={vote} refetch={votesRefetch} />
        ))}
      </Container>
    </section>
  );
};
export default MyVotes;
