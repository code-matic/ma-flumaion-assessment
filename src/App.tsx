import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, Store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Home, Tasks } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
]);

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer style={{ top: "100px" }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
