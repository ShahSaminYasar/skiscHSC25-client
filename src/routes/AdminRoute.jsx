import { Navigate } from "react-router-dom";
import useAuth from "../hooks/Auth/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== "admin" && user?.role !== "developer")
    return <Navigate to="/dashboard" />;

  return children;
};
export default AdminRoute;
