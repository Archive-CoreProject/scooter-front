import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Introduce from "./pages/Introduce.jsx";
import Login from "./pages/Login.jsx";
import Join from "./pages/user/Join.jsx";
import Pay from "./pages/user/Pay.jsx";
import Auth from "./pages/Auth.jsx";
import NotFound from "./components/NotFound.jsx";
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <App />,
    children: [
      { index: true, path: "/", element: <Main /> },
      {
        path: "/intro",
        element: <Introduce />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/pay",
        element: <Pay />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
