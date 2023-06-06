import React, { Component } from 'react';
import '../Styles/competences.sass';
import logo from '../resources/nn.svg';

class Competences extends Component {

  render() {
    return (
      <div id="competences" className="header">
        <div className="container-fluid">
          <div className="row">
          <div className="vertical-space"></div>
            <div className="col-sm-2 col-1"></div>
            <div className="col-sm-8 col-10">
            <div className="block">
            <h1 className="title animate-letters-accent animatable fadeInUp">Technical skills</h1>

              <div className="tdt mt-4 animatable fadeInUp">
                <h2 className="hot-topics">Some<span className='accent-color'> hot technologies</span> I worked on, or I'm currently using.</h2>
                <div className="tdt-spacing"></div>
                <img className="nn-image" src={logo} width='30%' height='30%' alt="Neural network image."/>
              </div>

              <div className="competences-list">
                <div className="row flexed">
                  <div className="small-div">
                      <ol>
                          <li className="one li-title animatable fadeInUp"><span>Programming</span>
                            <ol>
                              <li>Python</li>
                              <li>Swift</li>
                              <li>JavaScript</li>
                              <li>Shell/Bash</li>
                              <li>C/C++</li>
                              <li>Assembly x86</li>
                              <li>Solidity</li>
                              <li>Java/JEE</li>
                              <li>Flutter/Dart</li>
                            </ol>
                          </li>
                        </ol>

                        <ol>
                          <li className="two li-title animatable fadeInUp"><span>Machine Learning</span>
                            <ol>
                              <li>Tensorflow</li>
                              <li>Trax</li>
                              <li>Jax</li>
                              <li>HuggingFace</li>
                              <li>Graph Neural Nets</li>
                              <li>Transformers</li>
                              <li>CNNs</li>
                              <li>NLP</li>
                              <li>Genetic Algorithms</li>
                            </ol>
                          </li>
                        </ol>
                      </div>
                  
                    <div className="small-div">
                      <ol>
                          <li className="three li-title animatable fadeInUp"><span>Software craftsmanship</span>
                            <ol>
                              <li>Clean Architecture</li>
                              <li>TDD</li>
                              <li>SOLID principles</li>
                              <li>Scrum agility</li>
                            </ol>
                          </li>
                        </ol>

                        <ol>
                          <li className="four li-title animatable fadeInUp"><span>Computer Security</span>
                            <ol>
                              <li>Pentesting</li>
                              <li>Malware analysis</li>
                              <li>Kali Linux tools</li>
                              <li>Ethereum Blockchain</li>
                              <li>System programming</li>
                              <li>Cryptography</li>
                            </ol>
                          </li>
                        </ol>

                        <ol>
                          <li className="five li-title animatable fadeInUp"><span>Mathematics</span>
                            <ol>
                              <li>Linear Algebra</li>
                              <li>Calculus</li>
                              <li>Graph theory</li>
                              <li>Language theory</li>
                              <li>Information theory</li>
                              <li>Linear programming</li>
                            </ol>
                          </li>
                        </ol>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="col-sm-2 col-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Competences;
