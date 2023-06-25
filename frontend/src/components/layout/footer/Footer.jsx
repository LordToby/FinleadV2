import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../../../styles/footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h4 className="title">company</h4>
        <ul className="footer-ul">
          <li>
            <Link to="/" className="link">
              about us
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              our services
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              privacy policy
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="title">support</h4>
        <ul className="footer-ul">
          <li>
            <Link to="/" className="link">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              report bug
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              report profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="title">contact</h4>
        <ul className="footer-ul">
          <li className="email">
            <Link to="/" className="link">
              finlead@gmail.com
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer-col">
        <h4 className="title">follow us</h4>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className="social-icon facebook" />
          <FontAwesomeIcon icon={faTwitter} className="social-icon twitter" />
          <FontAwesomeIcon
            icon={faInstagram}
            className="social-icon instagram"
          />
        </div>
      </div>
    </footer>
  );
};