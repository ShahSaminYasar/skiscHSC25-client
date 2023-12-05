import { Link } from "react-router-dom";
import Container from "../../Container/Container";
import { FaBarsStaggered } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="bg-[#04071F] text-white px-3 h-[70px] flex items-center border-b-2 border-b-[#241a7c]">
      <Container className="flex flex-row gap-10 justify-between lg:justify-center items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-[35px] font-[300] text-white">LOGO</h1>
        </Link>

        {/* Menu Open Button */}
        <label
          htmlFor="dashboard-sidebar"
          className="drawer-button lg:hidden cursor-pointer"
        >
          <FaBarsStaggered className="text-[22px] text-white" />
        </label>
      </Container>
    </header>
  );
};
export default Header;
