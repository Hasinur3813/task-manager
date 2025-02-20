import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTasks = () => {
  const { currentUser, loading } = useAuth();
  const axios = useAxiosSecure();

  const {
    data: userTasks,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["userTasks", currentUser.email],
    enabled: !!currentUser && !loading,
    queryFn: async () => {
      const res = await axios.get(`/tasks/${currentUser.email}`);
      return res.data.data;
    },
  });

  return { userTasks, isPending, refetch };
};

export default useTasks;
