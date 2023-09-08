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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
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
