import React, { Component } from 'react';
import '../Styles/navbar.sass';

// `id` doubles as the nav-item class that update-navbar.js toggles `active` on.
const LINKS = [
  { id: 'intro', label: 'About' },
  { id: 'background', label: 'Background' },
  { id: 'bio', label: 'Research' },
  { id: 'news', label: 'News' },
  { id: 'publications', label: 'Publications' },
  { id: 'talks', label: 'Talks' },
  { id: 'collaborations', label: 'Collaborations' },
  { id: 'courses', label: 'Posts' },
];

/*
 * The theme button holds no state: public/scripts/change-theme.js owns the
 * theme (it also applies it before first paint) and listens for clicks on
 * [data-theme-toggle]. Both icons are rendered and CSS reveals the relevant
 * one, so the button stays correct whichever theme the script picks.
 */
const ThemeToggle = () => (
  <button type="button" className="theme-toggle" data-theme-toggle aria-label="Toggle dark mode" title="Toggle theme">
    <svg
      className="theme-toggle__sun"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
    <svg
      className="theme-toggle__moon"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.3 8.3 0 1 0 10.5 10.5z" />
    </svg>
  </button>
);

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg py-0" id="navbar-main">
        <div className="navbar-inner">
          <a className="navbar-brand" href="/#intro">
            Tristan Bilot
          </a>

          <div className="navbar-right">
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav ms-auto">
                {LINKS.map((link) => (
                  <li className={`${link.id} nav-item`} key={link.id}>
                    <a className="nav-link" href={`/#${link.id}`}>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ThemeToggle />

            <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span aria-hidden="true">
                <i className="fas fa-bars" />
              </span>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
