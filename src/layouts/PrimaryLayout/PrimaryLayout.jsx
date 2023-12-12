import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "./Header/Header";

const PrimaryLayout = () => {
  return (
    <>
      <Header />
      <div className="h-[70px] bg-[#010e0d]"></div>
      <main>
        <Outlet />
      </main>
      <div className="mt-8 mdd:mt-0"></div>
      <Footer />
    </>
  );
};
export default PrimaryLayout;
