import React, { Component } from 'react';
import '../Styles/projects.scss';
import '../Styles/visualProjects.sass';

class Courses extends Component {

  render() {
      return (
        <div id="courses" className="header">
            <div className="container-fluid position-relative">
            <div className="row">
                <div className="vertical-space"></div>
                <div className="col-sm-2 col-1"></div>
                <div className="col-sm-8 col-10">
                <h1 className="title  fadeInUp">Courses</h1>
                
                <div className="container-fluid position-relative">
                    <div class="animatable fadeInUp">
                        <h3 class="course-series-title">Deep Learning from scratch series</h3>
                        <hr/>
                        <blockquote class="blockquote">
                            <p className='span-title-comment'>In this first series, you will learn the <span className='accent-color'>theory</span> and the <span className='accent-color'>fundamentals</span> of Deep Learning but also implement a <span className='accent-color'>Deep Learning framework from scratch</span> using only Python, numpy and maths.</p>
                        </blockquote>
                    </div>

                    <div className="row animatable fadeInUp">
                        <div class="col-md-6">
                            <div class="courses-block accent-box">
                                <a href="/prerequisites" target="_blank" rel="noopener noreferrer">
                                    <h2><span class="course-nb">0</span> Prerequisites</h2>
                                    <div class="centered-img">
                                        <img src="/courses/prerequisites/img/main.jpg"></img>    
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="courses-block accent-box">
                                <a href="/chain-rule" target="_blank" rel="noopener noreferrer">
                                    <h2><span class="course-nb">1</span>Chain rule and computation graphs</h2>
                                    <div class="centered-img">
                                        <img src="/courses/chain-rule/img/g6.jpg" class="course-img"></img>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row animatable fadeInUp">
                        <div class="col-md-6">
                            <div class="courses-block accent-box">
                                <a href="/autodiff" target="_blank" rel="noopener noreferrer">
                                    <h2><span class="course-nb">2</span>Automatic differentiation engine from scratch</h2>
                                    <div class="centered-img">
                                        <img src="/courses/autodiff/img/main.jpg" class="header-img"></img>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="courses-block accent-box">
                                <a href="/optimization" target="_blank" rel="noopener noreferrer">
                                    <h2><span class="course-nb">3</span>Optimization and training</h2>
                                    <div class="centered-img">
                                        <img src="/courses/optimization/img/main.jpg" class="header-img"></img>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row animatable fadeInUp">
                        <div class="col-md-6">
                            <div class="courses-block accent-box">
                            <a href="/xor-sine" target="_blank" rel="noopener noreferrer">
                                <h2><span class="course-nb">4</span>XOR and sine problems</h2>
                                <div class="centered-img">
                                    <img src="/courses/xor-sine/img/g1.jpg"/>
                                </div>
                            </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container-fluid position-relative">
                    <div class="animatable fadeInUp">
                        <h3 class="course-series-title">Paper resources</h3>
                        <hr/>
                    </div>

                    <div className="row animatable fadeInUp">
                        <div class="col-md-6">
                            <div class="courses-block accent-box">
                                <a href="/phishgnn" target="_blank" rel="noopener noreferrer">
                                    <h2><span class="course-nb">0</span> PhishGNN-22 dataset</h2>
                                    <div class="centered-img">
                                        <img src="/courses/phishgnn/img/main.png"></img>    
                                    </div>
                                </a>
                            </div>
                        </div>
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

export default Courses;
