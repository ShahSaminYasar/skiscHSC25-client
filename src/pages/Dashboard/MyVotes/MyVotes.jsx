import { Helmet } from "react-helmet";
import Title from "../../../components/Title/Title";
import { Link } from "react-router-dom";

const MyVotes = () => {
  return (
    <section className="w-full">
      <Helmet>
        <title>Votes by me | SKISC HSC 2025</title>
      </Helmet>
      <div className="flex flex-row justify-between items-center gap-10 flex-wrap-wrap mb-[15px]">
        <Title className="mb-[0px]">Votes by me</Title>
        <Link to="/add-vote" className="buttonTwo">
          Launch a vote
        </Link>
      </div>
    </section>
  );
};
export default MyVotes;
