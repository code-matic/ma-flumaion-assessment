import TaskItem from "./TaskItem";
import { TaskListProps } from "@/@types/tasks";

const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 py-4">
          No tasks found. Create your first task!
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
