import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import PatrimoineChart from "./ui/chart";
import { RouterProvider,BrowserRouter,Route,Routes ,Link, createBrowserRouter} from 'react-router-dom'
import Dashboard from "./ui/dashboard";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard></Dashboard>
    },
    {
        path:"/chart",
        element: <PatrimoineChart></PatrimoineChart>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
<React.StrictMode>
  <Toaster></Toaster>
  <RouterProvider router={router}></RouterProvider>
</React.StrictMode>
);
