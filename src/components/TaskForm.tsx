import { v4 as uuidv4 } from "uuid";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, taskSchema } from "../zod_validation/taskSchema";
import TextInput from "./input/text-input";
import Select from "./input/select-input";
import { Task } from "../@types/tasks";
import { updateTask, addTask } from "@/reduxfeatures/taskSlice";
import { useAppDispatch } from "../redux/storehook";

const statusOptions = [
  { name: "New", value: "new" },
  { name: "Pending", value: "pending" },
  { name: "In Progress", value: "in-progress" },
  { name: "Completed", value: "completed" },
];

const priorityOptions = [
  { name: "Low", value: "Low" },
  { name: "Medium", value: "Medium" },
  { name: "High", value: "High" },
];

const TaskForm = ({
  initialData,
  onClose,
}: {
  initialData?: Task;
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const methods = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status || "New",
      dueDate: initialData?.dueDate || "",
      priority: initialData?.priority || "Low",
      assignee: initialData?.assignee || "",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: initialData?.updatedAt || new Date().toISOString(),
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TaskSchema> = async (values) => {
    // console.log("we got here", values);
    if (initialData) {
      // Update existing task
      dispatch(
        updateTask({
          ...values,
          id: initialData.id,
          createdAt: initialData.createdAt,
          updatedAt: new Date().toISOString(),
        })
      );
      toast.success("Task updated successfully");
    } else {
      // Create new task
      // console.log("we got here 2", values);
      dispatch(
        addTask({
          ...values,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
      toast.success("Task created successfully");
    }
    // Close the form after submission
    if (onClose) {
      onClose();
    }
  };

  const onError: SubmitErrorHandler<TaskSchema> = (errors) => {
    console.error(errors);
    // alert(getReadableValidationErrorMessage(errors));
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <Controller
          control={methods.control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextInput
                name="name"
                label="Name"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Enter task name"
                errorMessage={error?.message}
              />
            );
          }}
        />

        <Controller
          control={methods.control}
          name="description"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextInput
                name="description"
                label="Description"
                type="textarea"
                value={value}
                onChange={onChange}
                placeholder="Enter task description"
                errorMessage={error?.message}
              />
            );
          }}
        />

        <Controller
          control={methods.control}
          name="status"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Select
                name="status"
                label="Status"
                options={statusOptions}
                value={value}
                onChange={onChange}
                placeholder="Select task status"
                errorMessage={error?.message}
              />
            );
          }}
        />

        <Controller
          control={methods.control}
          name="dueDate"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextInput
                name="dueDate"
                label="Due Date"
                type="date"
                value={value}
                onChange={onChange}
                placeholder="Select due date"
                errorMessage={error?.message}
              />
            );
          }}
        />

        <Controller
          control={methods.control}
          name="priority"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Select
                name="priority"
                label="Priority"
                value={value}
                onChange={onChange}
                options={priorityOptions}
                placeholder="Select priority"
                errorMessage={error?.message}
              />
            );
          }}
        />

        <Controller
          control={methods.control}
          name="assignee"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextInput
                name="assignee"
                label="Assignee"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Enter assignee name"
                errorMessage={error?.message}
              />
            );
          }}
        />

        <div className="flex justify-end space-x-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {initialData ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TaskForm;
