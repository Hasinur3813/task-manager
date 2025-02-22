import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();
// const socket = io("https://task-manager-server-nzvr.onrender.com");
const socket = io("http://localhost:3000");

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { userTasks, isLoading } = useTasks();

  useEffect(() => {
    if (!isLoading && userTasks) {
      setTasks(userTasks);
    }
  }, [isLoading, userTasks]);

  useEffect(() => {
    socket.on("taskUpdated", (change) => {
      console.log("🔄 Task Update Received:", change);

      const taskCollection = [
        { category: "todo", tasks: [{}, {}] },
        { category: "inProgress", tasks: [{}, {}] },
        { category: "done", tasks: [{}, {}] },
      ];

      setTasks((prevTask) => {
        if (change.operationType === "insert") {
          return prevTask.map((task) => {
            if (task.category === change.fullDocument.category) {
              return {
                ...task,
                tasks: [...task.tasks, change.fullDocument],
              };
            } else {
              return task;
            }
          });
        }

        // task updating logic

        if (change.operationType === "update") {
          return prevTask.map((task) => {
            const updatedId = change.documentKey._id;
            const findUpdatedTask = task.tasks.find((t) => t._id === updatedId);
            if (findUpdatedTask) {
              return {
                ...task,
                tasks: task.tasks.map((task) =>
                  task._id === updatedId
                    ? { ...task, ...change.updateDescription.updatedFields }
                    : task
                ),
              };
            } else {
              return task;
            }
          });
        }

        // task deletion logic
        if (change.operationType === "delete") {
          return prevTask.map((task) => {
            return {
              ...task,
              tasks: task.tasks.filter((task) => {
                return task._id !== change.documentKey._id;
              }),
            };
          });
        }
        return prevTask;
      });
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, isLoading, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
