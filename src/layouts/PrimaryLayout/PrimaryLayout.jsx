import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "./Header/Header";

const PrimaryLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default PrimaryLayout;
