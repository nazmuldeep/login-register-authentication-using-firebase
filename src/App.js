import { getAuth } from 'firebase/auth'
import './App.css';
import app from './firebase/firebase.init';

import Register from './components/Register';
import RegisterReactBootstrap from './components/RegisterReactBootstrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';
import LoginBootstrap from './components/LoginBootstrap';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <RegisterReactBootstrap></RegisterReactBootstrap>
        },
        {
          path: '/register',
          element: <RegisterReactBootstrap></RegisterReactBootstrap>
        },
        {
          path: '/login',
          element: <LoginBootstrap></LoginBootstrap>
        },
      ]
    }

  ]);


  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>

    </div>
  );

}

export default App;
