import React, { Component } from 'react';
import '../../Styles/projects/global.sass'

class GeneticTSP extends Component {
  render() {
    return (
      <div className="projects-body">
        <div className="project-container">
          <h1 className='projects-h1-title'>Traveling Salesman Problem using genetic evolutive algorithm</h1>
          <a className="project-link" href="https://en.wikipedia.org/wiki/Travelling_salesman_problem">Problem</a><br/>
          <a className="project-link" href="https://github.com/TristanBilot/genetic-travelling-salesman">Source code</a>
        </div>
      </div>
    );
  }
}

export default GeneticTSP;
