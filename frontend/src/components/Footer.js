import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__project-name">
        &copy; {new Date().getFullYear()} Ilia Naumenko
      </p>
    </footer>
  );
}
export default Footer;