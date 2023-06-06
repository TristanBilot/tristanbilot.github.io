import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/projects.scss';
import '../Styles/visualProjects.sass';
import tsp from '../resources/tsp.png';
import knapsack from '../resources/knapsack.png';

class VisualProjects extends Component {

  render() {
      return (
        <div id="visual-projects" className="header">
            <div className="container-fluid position-relative">
            <div className="row">
                <div className="vertical-space"></div>
                <div className="col-sm-2 col-1"></div>
                <div className="col-sm-8 col-10">
                <h1 className="title  fadeInUp">Visual projects</h1>
                <blockquote class="blockquote">
                    <p className='span-title-comment'>Some <span className='accent-color'>graphic representations</span> of TSP and knapsack problems approximated using <span className='accent-color'>genetic approaches</span>.</p>
                </blockquote>
                <div className="small-vertical-space"></div>

                {/* <div className="tdt mt-4 animatable fadeInUp">
                    <h2 className="hot-topics">Some<span className='accent-color'> hot technologies</span> I worked on, or I'm currently using.</h2>
                </div>
                <div className="small-vertical-space"></div> */}

                    <div class="project-card animatable fadeInUp">
                        <div class="project-card__preview">
                            <h6>2020</h6>
                            <h3>
                                <a className="text-decoration-underline" href="https://en.wikipedia.org/wiki/Travelling_salesman_problem"><p></p>TSP</a> using genetic algorithm</h3>
                            <span className="project-card__subtitle">JavaScript</span>
                        </div>
                        <div class="project-card__info">
                        <img className="visual-project-card__img" src={tsp} alt="TSP image."></img>
                            <Link to={`/genetic-tsp`} target="_blank" rel="noopener noreferrer" class="project-card__btn">Visualize  <i class="fas fa-chevron-right"></i></Link>
                        </div>
                    </div>

                    <div class="project-card animatable fadeInUp">
                        <div class="project-card__preview">
                            <h6>2020</h6>
                            <h3>
                                <a className="text-decoration-underline" href="https://en.wikipedia.org/wiki/Knapsack_problem"><p></p>Knapsack problem</a> using genetic algorithm</h3>
                            <span className="project-card__subtitle">JavaScript</span>
                        </div>
                        <div class="project-card__info">
                        <img className="visual-project-card__img" src={knapsack} alt="Knapsack image."></img>
                            <Link to={`/genetic-knapsack`} target="_blank" rel="noopener noreferrer" class="project-card__btn">Visualize  <i class="fas fa-chevron-right"></i></Link>
                        </div>
                    </div>

                <div className="col-sm-2 col-1"></div>
            </div>
            </div>
        </div>
      </div>
      )
  }
}

export default VisualProjects;
