import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Feed from "./pages/Feed.tsx";
import Upload from "./pages/Upload.tsx";
import Post from "./pages/Post.tsx";
import Profile from "./pages/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/Post/:id",
    element: <Post />,
  },
  {
    path: "/Profile/:id",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
