import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/Auth/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      Dashboard Header <br /> <br />{" "}
      <button
        onClick={() => {
          logout();
          return navigate("/");
        }}
      >
        Logout
      </button>
      <br />
      <br />
    </div>
  );
};
export default Header;
