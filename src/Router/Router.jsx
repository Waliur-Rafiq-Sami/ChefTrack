import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import HomePage from "../Components/HomePage/HomePage";
import Login from "../Components/loginAndRegestation/login";
import Registration from "../Components/loginAndRegestation/Registration";
import AddAfoodItemPage from "../Components/AddAfoodItemPage/AddAfoodItemPage";
import MyProfile from "../Components/Myprofile/MyProfile";
import AllFoodPage from "../Components/AllFoodPage/AllFoodPage";
import UpdateFoodPage from "../Components/UpdateFoodPage/UpdateFoodPage";
import SingleFoodFullDetails from "../Components/AllFoodPage/SingleFoodFullDetails";
import MyPurchasePage from "../Components/MyPurchasePage/MyPurchasePage";
import PriveteRoute from "../Private/PriveteRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/foods", element: <AllFoodPage></AllFoodPage> },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
      { path: "/SingleFoodDetails", element: <SingleFoodFullDetails /> },

      {
        path: "/addFood",
        element: (
          <PriveteRoute>
            <AddAfoodItemPage></AddAfoodItemPage>
          </PriveteRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PriveteRoute>
            <MyProfile></MyProfile>
          </PriveteRoute>
        ),
      },
      {
        path: "/updateFood",
        element: (
          <PriveteRoute>
            <UpdateFoodPage></UpdateFoodPage>
          </PriveteRoute>
        ),
      },
      {
        path: "/MyPurchasePage",
        element: (
          <PriveteRoute>
            <MyPurchasePage />
          </PriveteRoute>
        ),
      },
    ],
  },
]);
