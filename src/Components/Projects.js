import React, { Component } from 'react';
import '../Styles/projects.scss';
import decompiler from '../resources/decompiler.png';
import cnn from '../resources/nn2.svg';
import bq from '../resources/bq.svg';
import kernel from '../resources/kernel.png';
import blockchain from '../resources/blockchain.png';

class Projects extends Component {

    render() {
        return (
            <div id="projects" className="header">
                <div className="container-fluid position-relative">
                    <div className="row">
                        <div className="vertical-space"></div>
                        <div className="col-sm-2 col-1"></div>
                        <div className="col-sm-8 col-10">
                            <h1 className="title  fadeInUp">Recent projects</h1>
                            <blockquote class="blockquote">
                                <p className='span-title-comment'>Recent <span className='accent-color'>personal projects</span> I worked on last years. The full list can be found on my <u><a className='accent-color' href="https://github.com/TristanBilot?tab=repositories" alt="link to my github page" target="_blank" rel="noopener noreferrer"> GitHub</a></u>.</p>
                            </blockquote>
                            <div className="small-vertical-space"></div>

                            <div class="project-card animatable fadeInUp">
                                <div class="project-card__preview">
                                    <h6>2022</h6>
                                    <h3>bqfetch</h3>
                                    <span className="project-card__subtitle">gcloud, multiprocessing, efficient fetching</span>
                                </div>
                                <div class="project-card__info">
                                    <img className="project-card__img project-card__img_small" src={bq} alt="bqfetch image."></img>
                                    <a href="https://github.com/TristanBilot/bqfetch" target="_blank" rel="noopener noreferrer" class="project-card__btn">View repo  <i class="fas fa-chevron-right"></i></a>
                                </div>
                            </div>

                            <div class="project-card animatable fadeInUp">
                                <div class="project-card__preview">
                                    <h6>2021</h6>
                                    <h3>Deep Learning decompiler</h3>
                                    <span className="project-card__subtitle">Tensorflow, NLP, Transformers</span>
                                </div>
                                <div class="project-card__info">
                                    <img className="project-card__img" src={decompiler} alt="Transformer image."></img>
                                    <a href="https://github.com/TristanBilot/deepiler" target="_blank" rel="noopener noreferrer" class="project-card__btn">View repo  <i class="fas fa-chevron-right"></i></a>
                                </div>
                            </div>

                            <div class="project-card animatable fadeInUp">
                                <div class="project-card__preview">
                                    <h6>2021</h6>
                                    <h3>CNN from scratch implementation</h3>
                                    <span className="project-card__subtitle">Python, NumPy</span>
                                </div>
                                <div class="project-card__info">
                                    <img className="project-card__img" src={cnn} alt="Neural network image."></img>
                                    <div class="progress-container">
                                        <div class="progress progress-1"></div>
                                        <span class="progress-text">70%</span>
                                    </div>
                                    <a href="https://github.com/TristanBilot/neural-network-framework" target="_blank" rel="noopener noreferrer" class="project-card__btn">View repo  <i class="fas fa-chevron-right"></i></a>
                                </div>
                            </div>

                            <div class="project-card animatable fadeInUp">
                                <div class="project-card__preview">
                                    <h6>2021</h6>
                                    <h3>x86 Kernel</h3>
                                    <span className="project-card__subtitle">C, Assembly x86</span>
                                </div>
                                <div class="project-card__info">
                                    <img className="project-card__img" src={kernel} alt="Kernel programming image."></img>
                                    <a href="https://github.com/TristanBilot/kernel_x86" target="_blank" rel="noopener noreferrer" class="project-card__btn">View repo  <i class="fas fa-chevron-right"></i></a>
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

export default Projects;
