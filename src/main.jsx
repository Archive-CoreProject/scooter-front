import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Main from "./pages/Main.jsx";
import Introduce from "./pages/Introduce.jsx";
import Login from "./pages/Login.jsx";
import Join from "./pages/user/Join.jsx";
import Auth from "./pages/Auth.jsx";
import NotFound from "./components/NotFound.jsx";
import Signup from "./pages/Signup";
import Mmanager from "./pages/Mmanager.jsx";
import Userinfo from "./pages/Userinfo.jsx";
import Rhistory from "./pages/Rhistory.jsx";
import Ridepay from "./pages/Ridepay.jsx";

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
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mmanager",
        element: <Mmanager />,
      },
      {
        path: "/userinfo",
        element: <Userinfo />,
      },
      {
        path: "/rhistory",
        element: <Rhistory />,
      },
      {
        path: "/pay",
        element: <Ridepay />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
);
