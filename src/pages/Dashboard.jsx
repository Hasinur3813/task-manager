import { useState } from "react";
import Avatar from "../Components/PublicRoute/Avatar/Avatar";
import { useAuth } from "../context/AuthProvider";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const tasks = [
  {
    category: "Todo",
    tasks: [
      {
        id: 1,
        task: "Design Homepage",
        status: "To Do",
        priority: "High",
        deadline: "2025-02-25",
        assignee: "Alice Johnson",
        description:
          "Create a modern and responsive homepage design using Figma. Ensure mobile and desktop compatibility.",
      },
      {
        id: 4,
        task: "Research Competitor Analysis",
        status: "To Do",
        priority: "Medium",
        deadline: "2025-02-28",
        assignee: "John Smith",
        description:
          "Analyze competitor websites, identify key features, and prepare a comparison report for UI/UX improvements.",
      },
      {
        id: 8,
        task: "Write User Stories",
        status: "To Do",
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
        status: "In Progress",
        priority: "High",
        deadline: "2025-02-22",
        assignee: "Emma Brown",
        description:
          "Implement email/password authentication with Firebase. Add OAuth options for Google and GitHub.",
      },
      {
        id: 5,
        task: "Set Up Database Schema",
        status: "In Progress",
        priority: "Medium",
        deadline: "2025-02-23",
        assignee: "Michael Lee",
        description:
          "Design and implement a MongoDB schema for users, tasks, and project details.",
      },
      {
        id: 9,
        task: "Develop Task Drag-and-Drop Feature",
        status: "In Progress",
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
        status: "Done",
        priority: "Low",
        completedOn: "2025-02-18",
        assignee: "David Wilson",
        description:
          "Initialized GitHub repository with README, license, and contribution guidelines.",
      },
      {
        id: 7,
        task: "Create Wireframes",
        status: "Done",
        priority: "Medium",
        completedOn: "2025-02-17",
        assignee: "Olivia Taylor",
        description:
          "Designed low-fidelity wireframes for the landing page, dashboard, and task manager sections.",
      },
      {
        id: 12,
        task: "Setup CI/CD Pipeline",
        status: "Done",
        priority: "High",
        completedOn: "2025-02-19",
        assignee: "John Smith",
        description:
          "Configured GitHub Actions for automatic deployment and testing on every push.",
      },
    ],
  },
];

function Dashboard() {
  const [taskList, setTaskList] = useState(tasks);

  const { currentUser } = useAuth();
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside the list

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
      console.log(updatedTasks);
    } else {
      // Moving task between categories
      const sourceCategory = taskList[source.droppableId];
      const destinationCategory = taskList[destination.droppableId];
      const [movedTask] = sourceCategory.tasks.splice(source.index, 1);
      destinationCategory.tasks.splice(destination.index, 0, movedTask);
      setTaskList([...taskList]);
      console.log([...taskList]);
    }

    // // Save data to the database (make a POST or PUT request here)
    // saveTaskDataToDB();
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

      <button
        type="button"
        className="btn btn-accent text-white text-lg font-semibold"
      >
        Add new task
      </button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {taskList.map((taskCategory, categoryIndex) => (
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
                  <h2 className="text-lg font-semibold">
                    {taskCategory.category}
                  </h2>

                  <div className="mt-4">
                    <ul>
                      {taskCategory.tasks.map((t, taskIndex) => (
                        <Draggable
                          key={t.id}
                          draggableId={t.id.toString()}
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
                                    {t.task}
                                  </p>
                                  <p className="text-sm">{t.description}</p>
                                </div>
                                <div className="space-x-2 flex">
                                  <button className="cursor-pointer">
                                    <MdDelete className="text-red-500 text-lg" />
                                  </button>
                                  <button className="cursor-pointer">
                                    <MdModeEdit className="text-primary text-lg" />
                                  </button>
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
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
