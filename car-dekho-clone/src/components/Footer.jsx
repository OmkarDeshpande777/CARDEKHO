import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>About Us</h3>
            <div className="footer-links">
              <a href="#about">About CarDekho Clone</a>
              <a href="#team">Our Team</a>
              <a href="#careers">Careers</a>
              <a href="#press">Press</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Car Categories</h3>
            <div className="footer-links">
              <a href="#hatchback">Hatchback</a>
              <a href="#sedan">Sedan</a>
              <a href="#suv">SUV</a>
              <a href="#mpv">MPV</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <div className="footer-links">
              <a href="#contact">Contact Us</a>
              <a href="#faq">FAQ</a>
              <a href="#help">Help Center</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <div className="footer-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
              <a href="#youtube">YouTube</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} CarDekho Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

