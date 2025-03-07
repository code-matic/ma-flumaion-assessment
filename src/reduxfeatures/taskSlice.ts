import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { Task, TaskState } from "../@types/tasks";

// Load tasks from localStorage if available
const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

// Check for time slot conflicts
const hasTimeConflict = (tasks: Task[], newTask: Task): boolean => {
  // Skip conflict check if the task doesn't have time slots defined
  if (!newTask.startTime || !newTask.endTime) return false;

  // Skip conflict check if the task is on a different date
  const conflictingTasks = tasks.filter(
    (task) =>
      // Only check tasks on the same date
      task.dueDate === newTask.dueDate &&
      // Don't compare with itself (for updates)
      task.id !== newTask.id &&
      // Check if time slots overlap
      ((newTask.startTime >= task.startTime &&
        newTask.startTime < task.endTime) ||
        (newTask.endTime > task.startTime && newTask.endTime <= task.endTime) ||
        (newTask.startTime <= task.startTime &&
          newTask.endTime >= task.endTime))
  );

  return conflictingTasks.length > 0;
};

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  conflictError: null,
};

export const taskSlice = createSlice({
  name: "TASK",
  initialState,
  reducers: {
    addTask: (state: TaskState, action: PayloadAction<Task>) => {
      // Check for time conflicts
      if (hasTimeConflict(state.tasks, action.payload)) {
        state.conflictError =
          "Time slot conflict: This time slot overlaps with an existing task";
      } else {
        state.conflictError = null;
        state.tasks.push(action.payload);
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.conflictError = null;
      state.tasks = state.tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state: TaskState, action: PayloadAction<Task>) => {
      // Check for time conflicts
      if (hasTimeConflict(state.tasks, action.payload)) {
        state.conflictError =
          "Time slot conflict: This time slot overlaps with an existing task";
      } else {
        state.conflictError = null;
        state.tasks = state.tasks.map((task: Task) =>
          task.id === action.payload.id ? action.payload : task
        );
        saveTasksToStorage(state.tasks);
      }
    },
    clearConflictError: (state: TaskState) => {
      state.conflictError = null;
    },
  },
});

export const getTask = (state: RootState, id: string) =>
  state.task.tasks.find((task: Task) => task.id === id);
export const getAllTasks = (state: RootState) => state.task.tasks;
export const getConflictError = (state: RootState) => state.task.conflictError;

export const { addTask, deleteTask, updateTask, clearConflictError } =
  taskSlice.actions;
export const taskSelector = (state: RootState) => state.task;
export default taskSlice.reducer;
