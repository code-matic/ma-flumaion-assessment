import { useEffect, useState } from "react";
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
import {
  updateTask,
  addTask,
  clearConflictError,
} from "@/reduxfeatures/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/storehook";
import { RootState } from "../redux/store";

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
  defaultDate,
}: {
  initialData?: Task;
  onClose?: () => void;
  defaultDate?: string;
}) => {
  const dispatch = useAppDispatch();
  const conflictError = useAppSelector(
    (state: RootState) => state.task.conflictError
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status || "New",
      dueDate: initialData?.dueDate || defaultDate || "",
      priority: initialData?.priority || "Low",
      assignee: initialData?.assignee || "",
      startTime: initialData?.startTime || "",
      endTime: initialData?.endTime || "",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: initialData?.updatedAt || new Date().toISOString(),
    },
    mode: "onBlur",
  });

  // Clear conflict error when form values change
  useEffect(() => {
    const subscription = methods.watch(() => {
      if (conflictError) {
        dispatch(clearConflictError());
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, conflictError, methods]);

  // Handle form submission result
  useEffect(() => {
    // Only run this effect when we're submitting and there's no conflict error
    if (isSubmitting && !conflictError) {
      toast.success(
        initialData ? "Task updated successfully" : "Task created successfully"
      );

      // Close the form after successful submission
      if (onClose) {
        onClose();
      }

      // Reset submitting state
      setIsSubmitting(false);
    } else if (isSubmitting && conflictError) {
      // If there's a conflict error, just reset the submitting state
      setIsSubmitting(false);
    }
  }, [isSubmitting, conflictError, initialData, onClose]);

  const onSubmit: SubmitHandler<TaskSchema> = async (values) => {
    // Set submitting state to true
    setIsSubmitting(true);

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
    } else {
      // Create new task
      dispatch(
        addTask({
          ...values,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
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
        {conflictError && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {conflictError}
          </div>
        )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            control={methods.control}
            name="startTime"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextInput
                  name="startTime"
                  label="Start Time"
                  type="time"
                  value={value}
                  onChange={onChange}
                  placeholder="Select start time"
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <Controller
            control={methods.control}
            name="endTime"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextInput
                  name="endTime"
                  label="End Time"
                  type="time"
                  value={value}
                  onChange={onChange}
                  placeholder="Select end time"
                  errorMessage={error?.message}
                />
              );
            }}
          />
        </div>

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
