import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import UpdateTask from "./pages/UpdateTask/UpdateTask.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import PublicRoute from "./Components/PublicRoute/PublicRoute.jsx";
import AddTask from "./pages/AddTask/AddTask.jsx";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <App />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/add-task",
    element: <AddTask />,
  },
  {
    path: "/update-task/:id",
    element: <UpdateTask />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* toast container for toast notification */}
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
