import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      Header
      <br /> <NavLink to="/">Home</NavLink>
      <NavLink to="/homeworks">Homeworks</NavLink>
    </div>
  );
};
export default Header;
