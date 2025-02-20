import { createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Dashboard from "../pages/Dashboard";
import App from "../App";

const routes = () => {
  const { currentUser, loading } = useAuth();
  // const currentUser = null;
  const route = createBrowserRouter([
    {
      path: "/",
      element: currentUser ? <Dashboard /> : <App />,
    },
  ]);
  return route;
};

export default routes;
