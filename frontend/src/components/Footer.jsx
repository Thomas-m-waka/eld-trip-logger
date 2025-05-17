import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TripPlanner. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
