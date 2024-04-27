import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-logo zoomIn wow animated"></div>

        <div className="footer-content-details">
          <div className="footer-contacts footer-content-details-2">
            <h3 className="section-subtitle">Contact Us:</h3>
            <p className="paragraph">Email: info@railway.com</p>
            <p className="paragraph">Phone: +123 456 789</p>
            <p className="paragraph">Address: 123 Railway Street, Mumbai, India</p>
          </div>

          <div className="footer-follow-1 footer-content-details-2">
            <h3 className="section-subtitle">Follow Us:</h3>
            <div className="footer-follow-2">
              <a href=""><div className="facebook social-media-logo"></div></a>
              <a href="https://www.instagram.com/arun__913/"><div className="instagram social-media-logo"></div></a>
              <a href=""><div className="twitter social-media-logo"></div></a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">CopyRight &copy; 2023 @ RailwayBooking</div>
        
      </div>
    </footer>
  );
}

export default Footer;
