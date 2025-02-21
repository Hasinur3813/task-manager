import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import UpdateTask from "./pages/UpdateTask/UpdateTask.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import PublicRoute from "./Components/PublicRoute/PublicRoute.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import AddTask from "./pages/AddTask/AddTask.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskProvider } from "./context/TaskProvider.jsx";
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
    element: (
      <TaskProvider>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </TaskProvider>
    ),
  },
  {
    path: "/add-task",
    element: (
      <TaskProvider>
        <PrivateRoute>
          <AddTask />,
        </PrivateRoute>
      </TaskProvider>
    ),
  },
  {
    path: "/update-task/:id",
    element: (
      <TaskProvider>
        <PrivateRoute>
          <UpdateTask />,
        </PrivateRoute>
      </TaskProvider>
    ),
  },
]);

const query = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <AuthProvider>
        <RouterProvider router={router}>
          <Toaster />
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
