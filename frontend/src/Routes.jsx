import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { NotFound } from "./pages/NotFound";
import Stock from "./pages/Stock";
import React, { useState, useEffect, Fragment, createContext } from "react";
import AuthContext from "./components/AuthContext";
import { Spinner } from "./components/shared/Spinner";
import { Register } from "./pages/Register";
import { ProfilePage } from "./pages/ProfilePage";
import About from "./components/About" 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound> </NotFound>,
    children: [
      { path: "main", element: <h1>This is the landing page</h1> },
      { path: "stock/:ticker", element: <Stock></Stock> },
      { path: "about", element: <About/> },
      { path: "spinner", element: <Spinner /> },
      { path: "register", element: <Register /> },
      { path: "profile/:name", element: <ProfilePage /> },
    ],
  },
]);

export const ConnectionContext = createContext();

function Routes() {
//   //const[userState, setUserState] = useState(AuthContext);
// const sendData = async() => {
//   const person = {
//     firstName: "Lars",
//     lastName: "Petersen",
//     country: "Sweden"
//    }
//    console.log("Så sender vi dig af sted, din lille lort!");
//  await connection.invoke("SendData", person);

// }
  // useEffect(() => {
  //   console.log("client-side code is executing!")
  //   const socketInstance = io(serverURL);
  //   setSocket(socketInstance);

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socketInstance.disconnect();
  //   };
  // <AuthContext.Provider value={{ userState, setUserState }}>
  // }, []);

  return (
    <Fragment>
      <RouterProvider
        router={router}
        fallbackElement={Spinner}
      ></RouterProvider>
      </Fragment>
  );
}

export default Routes;
