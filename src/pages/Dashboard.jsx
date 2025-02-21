import { useEffect, useState } from "react";
import Avatar from "../Components/PublicRoute/Avatar/Avatar";
import { useAuth } from "../context/AuthProvider";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTasks from "../hooks/useTasks";
import Loader from "../Components/Loader/Loader";
import useAxiosSecure from "../hooks/useAxiosSecure";

const tasks = [
  {
    category: "Todo",
    tasks: [
      {
        id: 1,
        task: "Design Homepage",
        category: "todo",
        priority: "High",
        deadline: "2025-02-25",
        assignee: "Alice Johnson",
        description:
          "Create a modern and responsive homepage design using Figma. Ensure mobile and desktop compatibility.",
      },
      {
        id: 4,
        task: "Research Competitor Analysis",
        category: "todo",
        priority: "Medium",
        deadline: "2025-02-28",
        assignee: "John Smith",
        description:
          "Analyze competitor websites, identify key features, and prepare a comparison report for UI/UX improvements.",
      },
      {
        id: 8,
        task: "Write User Stories",
        category: "todo",
        priority: "High",
        deadline: "2025-02-26",
        assignee: "Sophia Martinez",
        description:
          "Define user stories for the task management application to improve user experience and feature planning.",
      },
    ],
  },
  {
    category: "In Progress",
    tasks: [
      {
        id: 2,
        task: "Develop Authentication System",
        category: "inProgress",
        priority: "High",
        deadline: "2025-02-22",
        assignee: "Emma Brown",
        description:
          "Implement email/password authentication with Firebase. Add OAuth options for Google and GitHub.",
      },
      {
        id: 5,
        task: "Set Up Database Schema",
        category: "inProgress",
        priority: "Medium",
        deadline: "2025-02-23",
        assignee: "Michael Lee",
        description:
          "Design and implement a MongoDB schema for users, tasks, and project details.",
      },
      {
        id: 9,
        task: "Develop Task Drag-and-Drop Feature",
        category: "inProgress",
        priority: "High",
        deadline: "2025-02-27",
        assignee: "Olivia Taylor",
        description:
          "Implement a drag-and-drop functionality using React DnD to allow smooth task movement between categories.",
      },
    ],
  },

  {
    category: "Done",
    tasks: [
      {
        id: 3,
        task: "Set Up Project Repository",
        category: "done",
        priority: "Low",
        completedOn: "2025-02-18",
        assignee: "David Wilson",
        description:
          "Initialized GitHub repository with README, license, and contribution guidelines.",
      },
      {
        id: 7,
        task: "Create Wireframes",
        category: "done",
        priority: "Medium",
        completedOn: "2025-02-17",
        assignee: "Olivia Taylor",
        description:
          "Designed low-fidelity wireframes for the landing page, dashboard, and task manager sections.",
      },
      {
        id: 12,
        task: "Setup CI/CD Pipeline",
        category: "done",
        priority: "High",
        completedOn: "2025-02-19",
        assignee: "John Smith",
        description:
          "Configured GitHub Actions for automatic deployment and testing on every push.",
      },
    ],
  },
];
const categorycategoryMap = {
  0: "todo",
  1: "inProgress",
  2: "done",
};

function Dashboard() {
  const { userTasks, refetch, isLoading } = useTasks();
  const [taskList, setTaskList] = useState(userTasks || []);
  const [toDelete, setToDelete] = useState(null);
  const axios = useAxiosSecure();

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    if (!isLoading && userTasks) {
      setTaskList(userTasks);
    } else {
      setTaskList([]);
    }
  }, [userTasks, isLoading]);

  const { currentUser } = useAuth();
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside the list
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Reordering within the same category
    if (source.droppableId === destination.droppableId) {
      const updatedTasks = [...taskList];
      const [movedTask] = updatedTasks[source.droppableId].tasks.splice(
        source.index,
        1
      );
      updatedTasks[destination.droppableId].tasks.splice(
        destination.index,
        0,
        movedTask
      );
      setTaskList(updatedTasks);
    } else {
      // Moving task between categories
      const sourceCategory = taskList[source.droppableId];
      const destinationCategory = taskList[destination.droppableId];
      const [movedTask] = sourceCategory.tasks.splice(source.index, 1);
      movedTask.category = categorycategoryMap[destination.droppableId];
      destinationCategory.tasks.splice(destination.index, 0, movedTask);
      setTaskList([...taskList]);
    }

    // // Save data to the database (make a POST or PUT request here)
    saveTaskDataToDB();
  };

  const saveTaskDataToDB = () => {
    console.log("Saving task data to the database...");
    console.log(taskList);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/tasks/delete/${toDelete}`);
      if (res.data.data.deletedCount) {
        toast.success("Task deleted successfully");
        refetch();
      }
    } catch {
      toast.error("Operation failed, please try again!");
    } finally {
      setToDelete(null);
    }
  };
  const handleConfirmDelete = (id) => {
    document.getElementById("my_modal_5").showModal();
    setToDelete(id);
  };

  return (
    <div className="p-6 font-poppins bg-background min-h-screen">
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">
          Welcome,{" "}
          <span className="text-primary">{currentUser?.displayName}</span>
        </h1>

        <Avatar />
      </div>

      <Link to={"/add-task"}>
        {" "}
        <button
          type="button"
          className="btn btn-accent text-white text-lg font-semibold"
        >
          Add new task
        </button>
      </Link>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {taskList.length > 0 ? (
            taskList.map((taskCategory, categoryIndex) => (
              <Droppable
                key={taskCategory.category}
                droppableId={categoryIndex.toString()}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white p-4 shadow rounded"
                  >
                    <h2 className="text-xl font-semibold text-primary">
                      {taskCategory.category === "todo"
                        ? "To Do"
                        : taskCategory.category === "inProgress"
                        ? "In Progress"
                        : "Done"}
                    </h2>

                    <div className="mt-4">
                      <ul>
                        {taskCategory.tasks.map((t, taskIndex) => (
                          <Draggable
                            key={t._id}
                            draggableId={t._id.toString()}
                            index={taskIndex}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="border-b border-accent py-2"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-base font-semibold mb-2">
                                      {t.title}
                                    </p>
                                    <p className="text-sm">{t.description}</p>
                                  </div>
                                  <div className="gap-2 flex items-center">
                                    <button
                                      className="cursor-pointer"
                                      onClick={() => handleConfirmDelete(t._id)}
                                    >
                                      <MdDelete className="text-red-500 text-3xl" />
                                    </button>
                                    <Link
                                      to={`/update-task/${t._id}`}
                                      state={t}
                                    >
                                      <button className="cursor-pointer">
                                        <MdModeEdit className="text-primary text-2xl" />
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      </ul>
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </DragDropContext>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex gap-2">
                <button onClick={handleDelete} className="btn btn-error">
                  Delete
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Dashboard;
