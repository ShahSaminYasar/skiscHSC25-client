import { Navigate } from "react-router-dom";
import LoaderPage from "../components/Loaders/LoaderPage";
import useAuth from "../hooks/Auth/useAuth";

const CredentialsRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoaderPage />;

  if (!user) return <Navigate to="/login" />;

  if (user?.verified) return <Navigate to="/" />;

  if (user?.username && user?.phone) return <Navigate to="/verifying" />;

  return children;
};
export default CredentialsRoute;
