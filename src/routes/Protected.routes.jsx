import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth.Context.jsx";

const ProtectedRoute = ({ children }) => {
  const { userRole } = useAuth();
  // console.log(user)
  return userRole ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
