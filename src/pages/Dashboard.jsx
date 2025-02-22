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
import Timestamp from "../Components/Timestamp/Timestamp";
import Modal from "../Components/Modal/Modal";

const categoryMap = {
  0: "todo",
  1: "inProgress",
  2: "done",
};

function Dashboard() {
  const { userTasks, refetch, isLoading } = useTasks();
  const [taskList, setTaskList] = useState(userTasks || []);
  const [toDelete, setToDelete] = useState(null);
  const axios = useAxiosSecure();

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

    if (!destination) return;
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
      movedTask.category = categoryMap[destination.droppableId];
      destinationCategory.tasks.splice(destination.index, 0, movedTask);
      setTaskList([...taskList]);

      saveTaskDataToDB(movedTask);
    }
  };

  const saveTaskDataToDB = async (task) => {
    const updatedTask = { ...task, modified: new Date().toISOString() };
    try {
      const res = await axios.put(`/tasks/dnd/${task._id}`, updatedTask);
      if (res.data.success) {
        refetch();
      }
    } catch (error) {
      toast.error("Operation failed, Please try again!");
      console.error("Error updating task:", error);
    }
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

  if (isLoading) {
    return <Loader />;
  }

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
          {isLoading ? (
            <Loader />
          ) : taskList.length > 0 ? (
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
                    <h2 className="text-xl font-bold ">
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
                                {/* title, description */}
                                <p className="text-base font-semibold mb-2 text-primary">
                                  {t.title}
                                </p>
                                <p className="text-sm">{t.description}</p>

                                {/* timestamp and action buttons */}
                                <div className="flex justify-between items-end">
                                  {/* display time for creation/modified */}
                                  <div>
                                    <Timestamp t={t} />
                                  </div>
                                  {/* action button for tasks */}
                                  <div className="gap-2 flex items-start">
                                    <button
                                      className="cursor-pointer"
                                      onClick={() => handleConfirmDelete(t._id)}
                                    >
                                      <MdDelete className="text-red-500 text-2xl" />
                                    </button>
                                    <Link to={`/update-task/${t._id}`}>
                                      <button className="cursor-pointer">
                                        <MdModeEdit className="text-accent text-2xl" />
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
            <h2 className="font-semibold text-center my-20 text-3xl text-primary">
              No tasks available
            </h2>
          )}
        </div>
      </DragDropContext>

      {/* modal for confirm deletation */}
      <Modal handleDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
