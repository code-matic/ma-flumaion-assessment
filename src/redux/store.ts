import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../reduxfeatures/taskSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  task: taskReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(Store);

export const setupStore = () => {
  return Store;
};

export const createPreloadedState = (customState: Partial<RootState>) => {
  return {
    task: { ...Store.getState().task, ...customState.task },
  };
};

export type AppDispatch = typeof Store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof Store.getState>;

// https://blog.logrocket.com/using-typescript-redux-toolkit/
