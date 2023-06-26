import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        @2023 Petmeeter.com. This is not a real site and was created for
        learning purposes.
      </p>
      <div className="footer__right">
        <p>Developer: Adanna Liu</p>
        <a className="footer__nav-link" href="https://www.linkedin.com/in/adanna-liu-7505161a5/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin fa-xl"></i>
        </a>
        <a className="footer__nav-link" href="https://github.com/aliu7198" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
