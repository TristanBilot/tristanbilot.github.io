import React, { Component } from 'react';
import '../Styles/navbar.sass';

class Interests extends Component {

  render() {
    return (
        <nav class="navbar navbar-light fixed-top navbar-expand-lg py-0" id="navbar-main">
        <div class="container">
            <a class="navbar-brand" href="/#">Tristan Bilot</a>
            
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span><i class="fas fa-bars"></i></span>
            </button>
            
          <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav ms-auto">
              <li class="intro nav-item">
                <a class="nav-link" href="/#intro">
                  <span>About</span>
                </a>
              </li>
              <li class="publications nav-item">
                <a class="nav-link" href="/#publications">
                  <span>Publications</span>
                </a>
              </li>
              <li class="courses nav-item">
                <a class="nav-link" href="/#courses">
                  <span>Courses</span>
                </a>
              </li>
              <li class="articles nav-item">
                <a class="nav-link" href="/#articles">
                  <span>Articles</span>
                </a>
              </li>
              <li class="projects nav-item">
                <a class="nav-link" href="/#projects">
                  <span>Projects</span>
                </a>
              </li>
              <li class="visual-projects nav-item">
                <a class="nav-link" href="/#visual-projects">
                  <span>Visual Projects</span>
                </a>
              </li>
              <li class="background nav-item">
                <a class="nav-link" href="/#background">
                  <span>Background</span>
                </a>
              </li>
            </ul>
      
          </div>
        </div>
      </nav>
    );
  }
}

export default Interests;
