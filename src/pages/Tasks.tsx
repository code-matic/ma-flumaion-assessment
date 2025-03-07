import { useState } from "react";
import { Plus } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "@/@types/tasks";
import { useAppDispatch, useAppSelector } from "../redux/storehook";
import { deleteTask } from "@/reduxfeatures/taskSlice";
import { RootState } from "../redux/store";

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const selector = useAppSelector((state: RootState) => state.task);
  const tasks = selector.tasks;
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (task: Task) => {
    dispatch(deleteTask(task));
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="/"
            className="text-3xl font-bold text-blue-600 mr-6 hover:text-blue-800 transition-colors"
          >
            TaskMaster
          </a>
        </div>
        {!showForm && !editingTask && (
          <button
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Task
          </button>
        )}
      </div>

      {showForm ? (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              onClick={handleFormClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Back to List
            </button>
          </div>
          <TaskForm initialData={editingTask} onClose={handleFormClose} />
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Tasks;
