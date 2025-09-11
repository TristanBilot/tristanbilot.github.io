import React, { Component } from 'react';
import '../Styles/navbar.sass';

class Interests extends Component {
  render() {
    return (
      <nav className="navbar navbar-light fixed-top navbar-expand-lg py-0" id="navbar-main">
        <div className="container">
          <a className="navbar-brand" href="/#">Tristan Bilot</a>

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span><i className="fas fa-bars" /></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav ms-auto">
              <li className="intro nav-item">
                <a className="nav-link" href="/#intro"><span>About</span></a>
              </li>
              <li className="publications nav-item">
                <a className="nav-link" href="/#publications"><span>Publications</span></a>
              </li>
              <li className="courses nav-item">
                <a className="nav-link" href="/#courses"><span>Posts</span></a>
              </li>
              <li className="articles nav-item">
                <a className="nav-link" href="/#articles"><span>Articles</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Interests;