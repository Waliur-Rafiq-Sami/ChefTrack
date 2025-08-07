import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import HomePage from "../Components/HomePage/HomePage";
import Login from "../Components/loginAndRegestation/login";
import Registration from "../Components/loginAndRegestation/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
    ],
  },
]);
