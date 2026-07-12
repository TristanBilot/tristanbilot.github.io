import React from 'react';
import '../Styles/footer.scss';

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <span>© {new Date().getFullYear()} Tristan Bilot</span>
      <span className="site-footer__note">
        Developed with <span aria-label="love">❤️</span> in Paris
      </span>
    </div>
  </footer>
);

export default Footer;
