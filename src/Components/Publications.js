import React, { Component } from 'react';
import kernel from '../resources/publications/phishgnn_figure.png';
import intrusion_survey from '../resources/publications/intrusion_survey_figure.png';
import malware_survey from '../resources/publications/malware_survey_figure.png';
import '../Styles/publications.sass';

class Publications extends Component {

  render() {
    return (
      <div id="publications" className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 col-1"></div>
            <div className="col-sm-8 col-10">
                <div className="block">
                    <div className="vertical-space-only-mobile"></div>
                    <h1 className="title  fadeInUp">Publications</h1>
                    <blockquote class="blockquote">
                        <p className='span-title-comment'>My <i>beginning</i> <span className='accent-color'>research work</span>.</p>
                    </blockquote>
                    <div className="small-vertical-space"></div>
                    <div className="row animatable fadeInUp">
                        <div className="col-md-12">

                        <div class="publication-card animatable fadeInUp accent-box">
                              <div class="">
                                  <h6>IEEE Access Journal</h6>
                                  <h3>
                                    <a href='https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10123384' target="_blank" rel="noopener">
                                      Graph Neural Networks for Intrusion Detection: A Survey
                                    </a>
                                  </h3>
                                  <span className=""><u>Tristan Bilot</u>, Nour El Madhoun, Khaldoun Al Agha, Anis Zouaoui</span>
                              </div>
                              <div class="d-flex align-items-center justify-content-center">
                                  <img className="publication-card__image" src={intrusion_survey} alt="Intrusion survey GNNs"></img>
                              </div>
                              <div>
                                  <a href='https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10123384' target="_blank" rel="noopener">Paper</a> 
                              </div>
                          </div>
                          <div className="small-vertical-space"></div>

                          <div class="publication-card animatable fadeInUp accent-box">
                              <div class="">
                                  <h6>Submitted to ACM Computing Surveys (preprint)</h6>
                                  <h3>
                                    <a href='https://arxiv.org/abs/2303.16004' target="_blank" rel="noopener">
                                      A Survey on Malware Detection with Graph Representation Learning
                                    </a>
                                  </h3>
                                  <span className=""><u>Tristan Bilot</u>, Nour El Madhoun, Khaldoun Al Agha, Anis Zouaoui</span>
                              </div>
                              <div class="d-flex align-items-center justify-content-center">
                                  <img className="publication-card__image" src={malware_survey} alt="Malware survey GNNs"></img>
                              </div>
                              <div>
                                  <a href='https://arxiv.org/abs/2303.16004' target="_blank" rel="noopener">Paper</a> 
                              </div>
                          </div>
                          <div className="small-vertical-space"></div>

                          <div class="publication-card animatable fadeInUp accent-box">
                              <div class="">
                                  <h6>SECRYPT 2022 - Lisbon</h6>
                                  <h3>
                                    <a href='https://www.researchgate.net/publication/361002272_PhishGNN_A_Phishing_Website_Detection_Framework_using_Graph_Neural_Networks' target="_blank" rel="noopener">
                                      PhishGNN: A Phishing Website Detection Framework using Graph Neural Networks
                                    </a>
                                  </h3>
                                  <span className=""><u>Tristan Bilot</u>, Grégoire Geis, Badis Hammi</span>
                              </div>
                              <div class="d-flex align-items-center justify-content-center">
                                  <img className="publication-card__image" src={kernel} alt="PhishGNN"></img>
                              </div>
                              <div>
                                  <a href='https://www.researchgate.net/publication/361002272_PhishGNN_A_Phishing_Website_Detection_Framework_using_Graph_Neural_Networks' target="_blank" rel="noopener">Paper</a> 
                                  <a href='https://github.com/TristanBilot/phishGNN' target="_blank" rel="noopener">Code</a>
                              </div>
                          </div>

                        </div>

                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Publications;
