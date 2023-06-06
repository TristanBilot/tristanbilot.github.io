import React, { Component } from 'react';
import '../../Styles/projects/global.sass'

class GeneticKnapsack extends Component {
  render() {
    return (
      <div className="projects-body">
        <div className="project-container">
          <h1 className='projects-h1-title'>Knapsack Problem using genetic evolutive algorithm</h1>
          <a className="project-link" href="https://en.wikipedia.org/wiki/Knapsack_problem">Problem</a><br/>
          <a className="project-link" href="https://github.com/TristanBilot/genetic-knapsack-problem">Source code</a>

            <div className="container-fluid mt-4 knapsack-simulation-div">
                <div className="knapsack-stats"></div>
                <div className="row">
                    <div className="col-sm-1 col-0"></div>
                    <div className="col-sm-4 col-12 grey knapsack-block">
                        <div id="chosen-objects-stats"></div>
                        <div id="knapsack-solution-objects" className="flex-wrap">
                            
                        </div>
                    </div>
                    <div className="col-sm-1 col-0"></div>
                    <div className="col-sm-4 col-12 grey knapsack-block">
                        <div id="remaining-objects-stats"></div>
                        <div id="knapsack-objects" className="flex-wrap">

                        </div>
                    </div>
                    <div className="col-sm-2 col-0"></div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default GeneticKnapsack;
