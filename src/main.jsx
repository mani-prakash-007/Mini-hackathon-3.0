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
import { UndefinedRoutePage } from "./pages/UndefinedRoutePage.jsx";
import { ConsentManagerDemo } from "./pages/ConsentManagerDemo.jsx";

const App = () => {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="" element={<Welcome />} />
        <Route path="consentManager/demo" element={<ConsentManagerDemo />} />
        <Route path="*" element={<UndefinedRoutePage />} />
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
