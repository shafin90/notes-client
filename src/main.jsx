import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import WelcomePage from './pages/WelcomePage/WelcomePage.jsx';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import AuthProvider from './components/AuthProvider/AuthProvider';
import CreateNote from './pages/CreateNote/CreateNote';
import ViewNote from './pages/ViewNote/ViewNote';

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