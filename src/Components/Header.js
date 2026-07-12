import React from 'react';
import '../Styles/header.sass';
import me from '../resources/me4.jpeg';

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

const LINKS = [
  {
    label: 'CV',
    href: '/public_content/cv.pdf',
    icon: <span className="cv-logo">CV</span>,
  },
  {
    label: 'Email',
    href: 'mailto:tbilot@cs.ubc.ca',
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2.5,6 12,13 21.5,6" />
      </svg>
    ),
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.fr/citations?user=ijVNAGYAAAAJ&hl=en&oi=ao',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M5.24 13.77L.5 9.5 12 1l11.5 8.5-5.24 4.27C17.05 11.25 14.7 9.7 12 9.7s-5.05 1.55-6.76 4.07z" />
        <circle cx="12" cy="16.5" r="6.3" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/TristanBilot',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/tristanbilot',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.94 21H2.92l7.06-8.07L2.5 3h6.05l4.18 5.52L17.53 3zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49z" />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: 'https://tristanbilot.medium.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M13.54 12a6.77 6.77 0 1 1-13.54 0 6.77 6.77 0 0 1 13.54 0zM20.96 12c0 3.54-1.52 6.42-3.39 6.42s-3.38-2.88-3.38-6.42 1.51-6.42 3.38-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tristan-bilot/',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const Header = () => (
  <header id="intro" className="header hero">
    <div className="section__inner hero-inner">
      <img className="portrait" src={me} alt="Tristan Bilot" width="120" height="120" />

      <h1 className="hero-name">Tristan Bilot</h1>

      <p className="hero-role">
      Researcher in Security & AI
        {/* Postdoctoral Fellow @{' '}
        <a href="https://www.cs.ubc.ca/" target="_blank" rel="noopener noreferrer">
          University of British Columbia */}
        {/* </a> */}
      </p>

      <p className="hero-tagline">
        Currently working on a <span className="accent-color">foundation model</span> for{' '}
        <span className="accent-color">security</span> :)
      </p>

      <div className="hero-icons">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  </header>
);

export default Header;
