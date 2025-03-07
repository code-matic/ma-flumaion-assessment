import { TaskItemProps } from "@/@types/tasks";
import { Pencil, Trash2 } from "lucide-react";

// Helper function to format time in 12-hour format
const formatTime = (time: string): string => {
  if (!time) return "";

  try {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  } catch (error) {
    return time; // Return original if parsing fails
  }
};

const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Task Name: {task.name}
          </h3>
          <p className="text-gray-600 mt-1">Description: {task.description}</p>
          <p className="text-gray-600 mt-1">Assignee: {task.assignee}</p>
          <p className="text-gray-600 mt-1">Priority: {task.priority}</p>
          <p className="text-gray-600 mt-1">Due Date: {task.dueDate}</p>
          <p className="text-gray-600 mt-1">
            Time Slot: {formatTime(task.startTime)} - {formatTime(task.endTime)}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            <span className="mr-4">
              Created At: {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span>Updated At: {new Date(task.updatedAt).toLocaleString()}</span>
          </div>
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              task.status === "completed"
                ? "bg-green-100 text-green-800"
                : task.status === "in-progress"
                ? "bg-yellow-100 text-yellow-800"
                : task.status === "pending"
                ? "bg-orange-100 text-orange-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Status: {task.status}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            aria-label="Edit task"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
