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
      <ul className="footer-ul">
        <li>
          <Link to="/" className="link">
            Terms
          </Link>
        </li>
      </ul>

      <ul className="footer-ul">
        <li>
          <Link to="/" className="link">
            Contact
          </Link>
        </li>
      </ul>

      <ul className="footer-ul">
        <li className="email">
          <Link to="/" className="link">
            More
          </Link>
        </li>
      </ul>

      <div className="social-icons">
        <FontAwesomeIcon icon={faFacebook} className="social-icon facebook" />
        <FontAwesomeIcon icon={faTwitter} className="social-icon twitter" />
        <FontAwesomeIcon icon={faInstagram} className="social-icon instagram" />
      </div>
    </footer>
  );
};
