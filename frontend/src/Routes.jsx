import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { NotFound } from "./pages/NotFound";
import Stock from "./pages/Stock";
import React, { useState, useEffect } from "react";
import AuthContext from "./components/AuthContext";
import { Spinner } from "./components/shared/Spinner";
import { Register } from "./pages/Register";
import { ProfilePage } from "./pages/ProfilePage";
import { ModalPopup } from "./components/ModalPopup";

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
    ],
  },
]);

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

export default Routes;
