import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/Auth/useAuth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <div>
      Header
      <br /> <NavLink to="/">Home</NavLink>
      <NavLink to="/homeworks">Homeworks</NavLink>
      <br />
      REGISTER
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Header;
