import { useContext } from "react";
import { AuthProvider } from "../Auth/AuthContextProvider";
import { useLocation, Navigate } from "react-router-dom";

const PriveteRoute = ({ children }) => {
  const { user, loading } = useContext(AuthProvider);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PriveteRoute;
