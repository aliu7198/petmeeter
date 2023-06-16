import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        @2023 Petmeeter.com. This is not a real site and was created for learning
        purposes.
      </p>
      <div className="footer__right">
        <p>Developer: Adanna Liu</p>
        {/* TODO: add linkedin and github icons */}
      </div>
    </footer>
  );
};

export default Footer;
