import { Link, NavLink } from "react-router-dom";
import Container from "../../Container/Container";
import UserDropdown from "../../../components/UserDropdown/UserDropdown";

const Header = () => {
  const navlinks = [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/homeworks",
      name: "homeworks",
    },
    {
      path: "/assignments",
      name: "assignments",
    },
    {
      path: "/notes",
      name: "notes",
    },
    {
      path: "/blog",
      name: "blog",
    },
  ];

  return (
    <header className="bg-[#04071F] text-white px-3 h-[70px] flex items-center">
      <Container className="flex flex-row gap-10 justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-[35px] font-[300] text-white">LOGO</h1>
        </Link>

        {/* Navlinks */}
        <nav className="flex flex-row gap-6 items-center">
          {navlinks?.map((navlink) => (
            <NavLink
              key={navlink?.name}
              to={navlink?.path}
              className={({ isActive }) =>
                `capitalize text-[20px] font-400 ${
                  isActive ? "text-[#472DCF]" : "text-white"
                }`
              }
            >
              {navlink?.name}
            </NavLink>
          ))}

          <UserDropdown />
        </nav>
      </Container>
    </header>
  );
};
export default Header;
