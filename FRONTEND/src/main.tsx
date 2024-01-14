import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Feed from "./pages/Feed.tsx";
import Upload from "./pages/Upload.tsx";
import Post from "./pages/Post.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apolloClient.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    ),
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
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
