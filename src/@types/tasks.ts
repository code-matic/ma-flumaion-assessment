export type Task = {
  id: string;
  name: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
  assignee: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskState = {
  tasks: Task[];
  conflictError: string | null;
};

export type TaskItemProps = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
};

export type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export type TaskFormProps = {
  initialData?: Task;
  onSubmit: (data: Task) => void;
  onClose: () => void;
};
