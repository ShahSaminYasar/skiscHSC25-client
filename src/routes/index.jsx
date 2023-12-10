// TODO: Update profile data in firebase along with DB

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
import AddHomework from "../pages/Admin/AddHomework/AddHomework";
import EditHomework from "../pages/Admin/AddHomework/EditHomework";
import Homework from "../pages/Homework/Homework";
import AddAssignment from "../pages/Admin/AddAssignment/AddAssignment";
import EditAssignment from "../pages/Admin/AddAssignment/EditAssignment";
import Assignment from "../pages/Assignment/Assignment";
import AddNote from "../pages/Dashboard/MyNotes/AddNote";
import EditNote from "../pages/Dashboard/MyNotes/EditNote";
import Note from "../pages/Note/Note";
import AddPost from "../pages/Dashboard/MyPosts/AddPost";
import Blog from "../pages/Blog/Blog";
import EditPost from "../pages/Dashboard/MyPosts/EditPost";
import Stats from "../pages/Admin/Stats/Stats";
import AdminMessages from "../pages/Admin/AdminMessages/AdminMessages";
import AdminMessage from "../pages/Admin/AdminMessages/AdminMessage";

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
        path: "homework/:id",
        element: <Homework />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "assignment/:id",
        element: <Assignment />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "note/:id",
        element: <Note />,
      },
      {
        path: "blog",
        element: <Blogs />,
      },
      {
        path: "post/:id",
        element: <Blog />,
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
      {
        path: "add-homework",
        element: (
          <AdminRoute>
            <AddHomework />
          </AdminRoute>
        ),
      },
      {
        path: "edit-homework/:id",
        element: (
          <AdminRoute>
            <EditHomework />
          </AdminRoute>
        ),
      },
      {
        path: "add-assignment",
        element: (
          <AdminRoute>
            <AddAssignment />
          </AdminRoute>
        ),
      },
      {
        path: "edit-assignment/:id",
        element: (
          <AdminRoute>
            <EditAssignment />
          </AdminRoute>
        ),
      },
      {
        path: "add-note",
        element: <AddNote />,
      },
      {
        path: "edit-note/:id",
        element: <EditNote />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "edit-post/:id",
        element: <EditPost />,
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
        path: "stats",
        element: (
          <AdminRoute>
            <Stats />
          </AdminRoute>
        ),
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
      {
        path: "messages",
        element: (
          <AdminRoute>
            <AdminMessages />
          </AdminRoute>
        ),
      },
      {
        path: "message/:id",
        element: (
          <AdminRoute>
            <AdminMessage />
          </AdminRoute>
        ),
      },
    ],
  },
]);
