import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "../../components/Footer/Footer";

const DashboardLayout = () => {
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
export default DashboardLayout;
