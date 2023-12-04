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
import Verifying from "../pages/Auth/Verifying/Verifying";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import PasswordReset from "../pages/Auth/PasswordReset/PasswordReset";
import Credentials from "../pages/Auth/Credentials/Credentials";
import CredentialsRoute from "./CredentialsRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/verifying",
    element: <Verifying />,
  },
  {
    path: "/credentials",
    element: (
      <CredentialsRoute>
        <Credentials />
      </CredentialsRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthRoute>
        <PasswordReset />
      </AuthRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PrimaryLayout />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
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
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "homeworks",
        element: (
          <AdminRoute>
            <AdminHomeworks />
          </AdminRoute>
        ),
      },
      {
        path: "assignments",
        element: (
          <AdminRoute>
            <AdminAssignments />
          </AdminRoute>
        ),
      },
      {
        path: "notes",
        element: (
          <AdminRoute>
            <AdminNotes />
          </AdminRoute>
        ),
      },
      {
        path: "posts",
        element: (
          <AdminRoute>
            <Posts />
          </AdminRoute>
        ),
      },
    ],
  },
]);
