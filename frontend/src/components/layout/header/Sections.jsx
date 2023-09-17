import { React } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export const Sections = () => {
  return (
    <Nav className="">
      <Nav.Link href="#action1" className="navBar-link">
        Rankings
      </Nav.Link>
      <Nav.Link href="#action2" className="navBar-link">
        Forum
      </Nav.Link>
      <Nav.Link href="#" className="navBar-link">
        News
      </Nav.Link>
    </Nav>
  );
};
