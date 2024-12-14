import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Welcome } from "./pages/Welcome.jsx";
import { Layout } from "./Layout.jsx";

const App = () => {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
      </Route>
    )
  );
  return <RouterProvider router={Router} />;
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
