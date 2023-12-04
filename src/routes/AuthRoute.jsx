import { Navigate } from "react-router-dom";
import useAuth from "../hooks/Auth/useAuth";
import LoaderPage from "../components/Loaders/LoaderPage";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <LoaderPage />
    );

  if (user) return <Navigate to="/" />;

  return children;
};
export default AuthRoute;
