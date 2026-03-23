import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "undefined" && token !== "null";

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
