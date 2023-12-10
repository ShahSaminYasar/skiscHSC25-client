import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "./Header/Header";

const PrimaryLayout = () => {
  return (
    <>
      <Header />
      <main className="mdd:mt-[70px]">
        <Outlet />
      </main>
      <div className="mt-8 mdd:mt-2"></div>
      <Footer />
    </>
  );
};
export default PrimaryLayout;
