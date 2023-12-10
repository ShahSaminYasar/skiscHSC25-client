import { Helmet } from "react-helmet";
import Assignments from "./Assignments/Assignments";
import Homeworks from "./Homeworks/Homeworks";
import Notes from "./Notes/Notes";
import Posts from "./Posts/Posts";
import Stats from "./Stats/Stats";
import Contact from "./Contact/Contact";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | SKISC HSC 2025</title>
      </Helmet>
      <Stats />
      <Homeworks />
      <Assignments />
      <Notes />
      <Posts />
      <Contact/>
    </>
  );
};
export default Home;
