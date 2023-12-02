import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrimaryLayout from "../layouts/PrimaryLayout/PrimaryLayout";
import Home from "../pages/Home/Home";
import Homeworks from "../pages/Homeworks/Homeworks";
import Assignments from "../pages/Assignments/Assignments";
import Notes from "../pages/Notes/Notes";
import Blogs from "../pages/Blogs/Blogs";
import QnA from "../pages/QnA/QnA";
import Requests from "../pages/Requests/Requests";
import Votes from "../pages/Votes/Votes";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import MyNotes from "../pages/Dashboard/MyNotes/MyNotes";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import Users from "../pages/Admin/Users/Users";
import AdminHomeworks from "../pages/Admin/AdminHomeworks/AdminHomeworks";
import AdminAssignments from "../pages/Admin/AdminAssignments/AdminAssignments";
import AdminNotes from "../pages/Admin/AdminNotes/AdminNotes";
import Posts from "../pages/Admin/Posts/Posts";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrimaryLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "homeworks",
        element: <Homeworks />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "blog",
        element: <Blogs />,
      },
      {
        path: "qna",
        element: <QnA />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "votes",
        element: <Votes />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-notes",
        element: <MyNotes />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "homeworks",
        element: <AdminHomeworks />,
      },
      {
        path: "assignments",
        element: <AdminAssignments />,
      },
      {
        path: "notes",
        element: <AdminNotes />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
    ],
  },
]);
