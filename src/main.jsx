import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login/Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import UpdateTask from "./pages/UpdateTask/UpdateTask.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import PublicRoute from "./Components/PublicRoute/PublicRoute.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import AddTask from "./pages/AddTask/AddTask.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <HomePage />,
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-task",
    element: (
      <PrivateRoute>
        <AddTask />,
      </PrivateRoute>
    ),
  },
  {
    path: "/update-task/:id",
    element: (
      <PrivateRoute>
        <UpdateTask />,
      </PrivateRoute>
    ),
  },
]);

const query = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
