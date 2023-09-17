import { React } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export const DropDown = () => {
  return (
    <NavDropdown
      id="navbarScrollingDropdown"
      title={<FontAwesomeIcon icon={faBars} />}
    >
      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
      <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
    </NavDropdown>
  );
};
