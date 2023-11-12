import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { NotFound } from "./pages/NotFound";
import Stock from "./pages/Stock";
import { Test } from "./pages/Test";
import React, { useState, useEffect } from "react";
import AuthContext from "./components/AuthContext";
import { Spinner } from "./components/shared/Spinner";
import { Register } from "./pages/Register";
import { ProfilePage } from "./pages/ProfilePage";
import { ModalPopup } from "./components/ModalPopup";
import jwt_decode from "jwt-decode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound> </NotFound>,
    children: [
      { path: "main", element: <h1>This is the landing page</h1> },
      { path: "stock/:ticker", element: <Stock></Stock> },
      { path: "about", element: <h1>To be added later</h1> },
      { path: "spinner", element: <Spinner /> },
      { path: "register", element: <Register /> },
      { path: "profile/:name", element: <ProfilePage /> },
      {path: "test", element: <Test/>}
    ],
  },
]);

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Gendan JWT-token ved sideindlæsning
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
       setIsLoggedIn(true);
    }
  }, []);

  console.log(isLoggedIn);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RouterProvider
        router={router}
        fallbackElement={Spinner}
      ></RouterProvider>
    </AuthContext.Provider>
  );
}

function checkToken(token){
  const { decodedToken, isExpired } = useJwt(token);
  console.log(decodedToken);
}

export default Routes;
