import { SearchBar } from "./SearchBar";
import "../../../styles/navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { DropDown } from "./DropDown";
import { Icons } from "./Icons";
import { Sections } from "./Sections";
import AuthContext from "../../AuthContext";
import { useContext } from "react";
import { ModalPopup } from "../../ModalPopup";
import { LogOutButton } from "../../LogoutButton";

export const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <Navbar className="myNavbar">
      <Container fluid style={{ backgroundColor: "transparent" }}>
        <div>
          <DropDown></DropDown>
          <Navbar.Brand href="#">
            <img src="/Title.png" className="nav-logo" />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <SearchBar />
        <Sections />
        {isLoggedIn ? (
          <div className="left-header">
            <Icons />
          </div>
        ) : (
          <ModalPopup />
        )}
      </Container>
    </Navbar>
  );
};
