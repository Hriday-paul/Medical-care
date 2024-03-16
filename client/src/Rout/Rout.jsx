import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Pages/Root/Root"
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Alltests from "../Pages/Alltests/Alltests";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUser from "../Pages/Dashboard/AdminDashboard/AllUser/AllUser";
import AddTest from "../Pages/Dashboard/AdminDashboard/AddTest/AddTest";
import AllTest from "../Pages/Dashboard/AdminDashboard/AllTest/AllTest";
import Reservation from "../Pages/Dashboard/AdminDashboard/Reservation/Reservation";

const rout = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allTest",
        element: <Alltests />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard /> ,
    children: [
      {
        path: "/dashboard/users",
        element: <AllUser />,
      },
      {
        path: "/dashboard/addTest",
        element: <AddTest />,
      },
      {
        path: "/dashboard/allTest",
        element: <AllTest />,
      },
      {
        path: "/dashboard/reservation",
        element: <Reservation />,
      }
    ],
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path: "/login",
    element: <Login ></Login>,
  }
]);

export default rout;