import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import WelcomePage from './components/WelcomePage/WelcomePage';
import Home from './components/Home/Home';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import AuthProvider from './components/AuthProvider/AuthProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage></WelcomePage>,
  },
  {
    path: '/home',
    element: <Home></Home>
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>
  },
  {
    path: '/registration',
    element: <RegistrationPage></RegistrationPage>
  },
  {
    path:'/note',
    element:<CreateNote></CreateNote>
  },
  {
    path:'/note/:id',
    element:<ViewNote></ViewNote>,
    loader:({params})=>fetch(`https://notes-server-ygw4.vercel.app/noteCollection/${params.id}`)

  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);