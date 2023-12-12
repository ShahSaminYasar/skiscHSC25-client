import { Link } from "react-router-dom";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import useVotes from "../../../hooks/GET/useVotes";
import Container from "../../../layouts/Container/Container";
import VoteCard from "../../../components/Cards/VoteCard/VoteCard";
import Title from "../../../components/Title/Title";
import SeeAllButton from "../../../components/Buttons/SeeAllButton";

const Voting = () => {
  let votes = useVotes(null, null, 2);
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
      <section className="section bg-[#01020E]">
        <Container>
          <Title>Voting Zone</Title>
          <div className="grid grid-cols-1 mdd:grid-cols-2 gap-5">
            {votes?.map((vote) => (
              <VoteCard key={vote?._id} vote={vote} refetch={votesRefetch} />
            ))}
          </div>
          <SeeAllButton className="ml-auto" to={`/votes`} />
        </Container>
      </section>
    </>
  );
};
export default Voting;
