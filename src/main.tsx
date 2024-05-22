import React from "react";
import ReactDOM from "react-dom/client";
import "./pages/Home.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Animals } from "./pages/Animals";
import { AnimalView } from "./pages/AnimalView";
import { Layout } from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/animals",
        element: <Animals></Animals>,
      },
      {
        path: "/animals/:id",
        element: <AnimalView></AnimalView>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
