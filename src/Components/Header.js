import React, { Component } from 'react';
import '../Styles/header.sass';
import '../Styles/toggle-btn.scss';
import '../Styles/first_page.sass';
import me from '../resources/me4.jpg';

const Header = () => {
  return (
    <div id="intro" className="header">
      <div className="hero-inner">
        {/* avatar */}
        <div class="portrait" style={{ backgroundImage: "url(" + me + ")" }}>
                    </div>

        {/* name */}
        <span className="title">Tristan Bilot</span>
        <span className="hero-tagline">
          I&apos;m a Ph.D. student at Université Paris-Saclay working on <span className='accent-color'>graph learning</span> and <span className='accent-color'>LLMs</span> for cybersecurity.
        </span>
        {/* <h6>I'm a Ph.D. student at Université Paris-Saclay. My research focuses on graph learning and LLMs applied to cybersecurity.</h6> */}

        {/* icons (exact SVGs and order) */}
        
        <div className="hero-icons" aria-label="profiles and links">
          <a href="/public_content/cv.pdf" className='cv-logo' target="_blank" rel="noopener noreferrer" title="CV" aria-label="CV">CV</a>

          <a href="mailto:tristan.bilot@universite-paris-saclay.fr" target="_blank" rel="noopener noreferrer" title="Email" aria-label="Email">
            {/* Email */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>

          <a href="https://scholar.google.fr/citations?user=ijVNAGYAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar">
            {/* Google Scholar */}
            <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.242 13.769L0.5 9.5 12 1l11.5 9-5.242 3.769C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          </a>

          <a href="https://github.com/TristanBilot" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
            {/* GitHub */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          <a href="https://x.com/tristanbilot" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Twitter/X">
            {/* X/Twitter */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>

          <a href="https://tristanbilot.medium.com" target="_blank" rel="noopener noreferrer" title="BlueSky" aria-label="BlueSky">
            {/* BlueSky */}
            <i class="fab fa-medium big-icon"></i>
          </a>

          <a href="https://www.linkedin.com/in/tristan-bilot/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
            {/* LinkedIn */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
        {/* buttons */}
        {/* <div className="hero-ctas">
          <a className="button" href="/#publications" rel="noopener" title="Research">
            Publications
          </a>
          <a className="button" href="/#courses" rel="noopener" title="Research">
            Blog Posts
          </a>
          <a className="button" href="/#articles" rel="noopener" title="Research">
            Articles
          </a>
        </div> */}
      </div>
      <div class="background">
          <div class="toggle-body">
            <div id="toggle-btn" class="toggle-btn"></div>
          </div>
        </div>
    </div>
  );
};

export default Header;