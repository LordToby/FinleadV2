import "../index.css";
import { ModalPopup } from "../components/ModalPopup";
import { Header } from "../components/layout/header/Header";
import { Footer } from "../components/layout/footer/Footer";
import { Outlet } from "react-router-dom";
import { CommentField } from "../components/CommentField";
import { Fragment } from "react";
export const Root = () => {
  return (
    <Fragment>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Outlet></Outlet>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Fragment>
  );
};
