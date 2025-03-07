import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "@/@types/tasks";
import { useAppDispatch, useAppSelector } from "../redux/storehook";
import { deleteTask } from "@/reduxfeatures/taskSlice";
import { RootState } from "../redux/store";

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const selector = useAppSelector((state: RootState) => state.task);
  const allTasks = selector.tasks;
  const dispatch = useAppDispatch();

  // Filter tasks by selected date
  const tasks = selectedDate
    ? allTasks.filter((task) => task.dueDate === selectedDate)
    : allTasks;

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const clearDateFilter = () => {
    setSelectedDate("");
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
        <div className="flex flex-col sm:flex-row gap-2">
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
      </div>

      {!showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-500" />
              <h2 className="text-lg font-medium">Filter by Date</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              {selectedDate && (
                <button
                  onClick={clearDateFilter}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
          <TaskForm
            initialData={editingTask}
            onClose={handleFormClose}
            defaultDate={
              !editingTask && selectedDate ? selectedDate : undefined
            }
          />
        </div>
      ) : (
        <div>
          {selectedDate && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
              Showing tasks for: {new Date(selectedDate).toLocaleDateString()}
              {tasks.length === 0 && " (No tasks scheduled for this date)"}
            </div>
          )}
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      )}
    </div>
  );
};

export default Tasks;
