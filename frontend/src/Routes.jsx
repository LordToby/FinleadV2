import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { NotFound } from "./pages/NotFound";
import Stock from "./pages/Stock";
import React, { useState, useEffect } from "react";
import AuthContext from "./components/AuthContext";
import { Spinner } from "./components/shared/Spinner";
import { Register } from "./pages/Register";
import { ProfilePage } from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound> </NotFound>,
    children: [
      { path: "main", element: <h1>This is the landing page</h1> },
      { path: "stock/:ticker", element: <Stock></Stock> },
      { path: "about", element: <h1>About</h1> },
      { path: "spinner", element: <Spinner /> },
      { path: "register", element: <Register /> },
      { path: "profile/:name", element: <ProfilePage /> },
    ],
  },
]);

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthContext);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/checkLogin", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      checkLoggedIn();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RouterProvider
        router={router}
        fallbackElement={Spinner}
      ></RouterProvider>
    </AuthContext.Provider>
  );
}

export default Routes;
