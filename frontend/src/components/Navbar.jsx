import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaBars, FaTimes } from 'react-icons/fa';
import { clearTokens } from '../api/auth';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };

    checkAuth(); // run on mount
    window.addEventListener('authChange', checkAuth); // listen for login/logout

    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaMapMarkedAlt className="logo-icon" />
          <span className="logo-text">TripPlanner</span>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={toggleMobileMenu}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/features" className="navbar-link" onClick={toggleMobileMenu}>Features</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link" onClick={toggleMobileMenu}>About</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link" onClick={toggleMobileMenu}>
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <button
                  className="navbar-link logout-link"
                  style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link login-link" onClick={toggleMobileMenu}>Login</Link>
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;

