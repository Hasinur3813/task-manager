import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../Loader/Loader";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
      if (currentUser) {
        navigate("/dashboard");
      }
    }
  }, [loading, currentUser, navigate]);

  if (!isInitialized) {
    return <Loader />;
  }

  return children;
};

export default PublicRoute;
