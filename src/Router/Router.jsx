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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/login", element: <Login></Login> },
      { path: "/registration", element: <Registration></Registration> },
      { path: "/addFood", element: <AddAfoodItemPage></AddAfoodItemPage> },
      { path: "/profile", element: <MyProfile></MyProfile> },
      { path: "/foods", element: <AllFoodPage></AllFoodPage> },
      { path: "/updateFood", element: <UpdateFoodPage></UpdateFoodPage> },
      { path: "/SingleFoodDetails", element: <SingleFoodFullDetails /> },
      { path: "/MyPurchasePage", element: <MyPurchasePage /> },
    ],
  },
]);
