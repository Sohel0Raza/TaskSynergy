import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main.jsx';
import SignUp from './pages/login/SignUp';
import Login from './pages/login/Login';
import TaskList from './pages/taskList/TaskList';
import CreateTask from './pages/taskList/CreateTask';
import PrivateRoute from './route/PrivateRoute';
import GroupList from './pages/groupList/GroupList';
import ErrorPage from './pages/errorPage/ErrorPage';
import AssignTask from './pages/taskList/AssignTask';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/',
        element:<PrivateRoute><TaskList/></PrivateRoute>
      },
      {
        path:'/createTask',
        element:<PrivateRoute><CreateTask/></PrivateRoute>
      },
      {
        path:'/groupList',
        element:<PrivateRoute><GroupList/></PrivateRoute>
      },
      {
        path:"assign/:id",
        element:<AssignTask></AssignTask>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/profile',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
