import { Navigate } from "react-router-dom";
import useAuth from "../hooks/Auth/useAuth";
import LoaderPage from "../components/Loaders/LoaderPage";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) return <LoaderPage />;

  if (!user) return <Navigate to="/login" />;

  if (user?.verified !== true) {
    return <Navigate to="/verifying" />;
  }

  return children;
};
export default PrivateRoute;
