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

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
};

export const taskSlice = createSlice({
  name: "TASK",
  initialState,
  reducers: {
    addTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    deleteTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task: Task) =>
        task.id === action.payload.id ? action.payload : task
      );
      saveTasksToStorage(state.tasks);
    },
  },
});

export const getTask = (state: RootState, id: string) =>
  state.task.tasks.find((task: Task) => task.id === id);
export const getAllTasks = (state: RootState) => state.task.tasks;

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export const taskSelector = (state: RootState) => state.task;
export default taskSlice.reducer;
