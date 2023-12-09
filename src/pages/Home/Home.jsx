import Assignments from "./Assignments/Assignments";
import Homeworks from "./Homeworks/Homeworks";
import Notes from "./Notes/Notes";
import Posts from "./Posts/Posts";

const Home = () => {
  return (
    <>
      <Homeworks />
      <Assignments />
      <Notes />
      <Posts />
    </>
  );
};
export default Home;
