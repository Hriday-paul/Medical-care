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
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Private from "../Components/Shared/Private/Private";
import TestResult from "../Pages/Dashboard/UserDashboard/TestResult/TestResult";
import Profile from "../Pages/Dashboard/UserDashboard/Profile/Profile";
import Details from "../Pages/Details/Details";
import Appoinments from "../Pages/Dashboard/UserDashboard/Appoinments/Appoinments";
import Gallery from "../Pages/Gallery/Gallery";
import Error from "../Components/Shared/Ui/Error";

const rout = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement : <Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allTest",
        element: <Alltests />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Private><Dashboard /></Private> ,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/users",
        element: <AllUser/>,
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
      },
      {
        path: "/dashboard/result",
        element: <TestResult />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/myAppoinments",
        element: <Appoinments />,
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