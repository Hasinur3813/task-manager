import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

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
    return <h2>Loding...</h2>;
  }

  return children;
};

export default PublicRoute;
