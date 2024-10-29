import React, { Component } from 'react';
import kernel from '../resources/publications/phishgnn_figure.png';
import intrusion_survey from '../resources/publications/intrusion_survey_figure.png';
import malware_survey from '../resources/publications/malware_survey_figure.png';
import csnet from '../resources/publications/csnet.png';
import feae from '../resources/publications/feae.png';
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
                        <p className='span-title-comment'>Publications related to my <span className='accent-color'>research work</span>.</p>
                    </blockquote>
                    <div className="small-vertical-space"></div>
                    <div className="row animatable fadeInUp">
                        <div className="col-md-12">

                        <div className="publication-card animatable fadeInUp accent-box d-flex" style={{ display: 'flex' }}>
                          <div className="text-section" style={{ flex: 1 }}>
                            <i className="fa-solid fa-award"></i> <b>Best paper award</b>
                            <p>International Workshop on Security - IWSEC (2024)</p>
                            <p>
                              <a className="card-title" href="https://dl.acm.org/doi/abs/10.1007/978-981-97-7737-2_15" target="_blank" rel="noopener noreferrer">
                                Few Edges Are Enough: Few-Shot Network Attack Detection with Graph Neural Networks
                              </a>
                            </p>
                            <span><u>Tristan Bilot</u>, Nour El Madhoun, Khaldoun Al Agha, Anis Zouaoui</span>
                            <br />
                            <a href="https://dl.acm.org/doi/abs/10.1007/978-981-97-7737-2_15" target="_blank" rel="noopener noreferrer">Paper</a>
                          </div>
                          <div className="image-section d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
                            <img className="publication-card__image" src={feae} alt="Malware survey GNNs" />
                          </div>
                        </div>
                          <div className="very-small-vertical-space"></div>

                          <div className="publication-card animatable fadeInUp accent-box d-flex" style={{ display: 'flex' }}>
                            <div className="text-section" style={{ flex: 1 }}>
                              <h6>ACM Computing Surveys (2024)</h6>
                              <p>
                                <a className="card-title" href="https://dl.acm.org/doi/10.1145/3664649" target="_blank" rel="noopener noreferrer">
                                  A Survey on Malware Detection with Graph Representation Learning
                                </a>
                              </p>
                              <span><u>Tristan Bilot</u>, Nour El Madhoun, Khaldoun Al Agha, Anis Zouaoui</span>
                              <br />
                              <a href="https://dl.acm.org/doi/10.1145/3664649" target="_blank" rel="noopener noreferrer">Paper</a>
                            </div>
                            <div className="image-section d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
                              <img className="publication-card__image" src={malware_survey} alt="Malware survey GNNs" />
                            </div>
                          </div>
                          <div className="very-small-vertical-space"></div>

                          <div className="publication-card animatable fadeInUp accent-box d-flex" style={{ display: 'flex' }}>
                            <div className="text-section" style={{ flex: 1 }}>
                              <h6>CSNet (2023)</h6>
                              <p>
                                <a className="card-title" href="https://hal.science/hal-04186579/document" target="_blank" rel="noopener noreferrer">
                                  A Benchmark of Graph Augmentations for Contrastive Learning-Based Network Attack Detection with Graph Neural Networks
                                </a>
                              </p>
                              <span><u>Tristan Bilot</u>, Nour El Madhoun, Khaldoun Al Agha, Anis Zouaoui</span>
                              <br />
                              <a href="https://hal.science/hal-04186579/document" target="_blank" rel="noopener noreferrer">Paper</a>
                            </div>
                            <div className="image-section d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
                              <img className="publication-card__image" src={csnet} alt="Benchmark contrastive learning" />
                            </div>
                          </div>
                          <div className="very-small-vertical-space"></div>
                        
                          <div className="publication-card animatable fadeInUp accent-box d-flex" style={{ display: 'flex' }}>
                            <div className="text-section" style={{ flex: 1 }}>
                              <h6>IEEE Access (2023)</h6>
                              <p>
                                <a className="card-title" href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10123384" target="_blank" rel="noopener noreferrer">
                                  Graph Neural Networks for Intrusion Detection: A Survey
                                </a>
                              </p>
                              <span><u>Tristan Bilot</u>, Nour El Madhoun, Khaldoun Al Agha, Anis Zouaoui</span>
                              <br />
                              <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10123384" target="_blank" rel="noopener noreferrer">Paper</a>
                            </div>
                            <div className="image-section d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
                              <img className="publication-card__image" src={intrusion_survey} alt="Intrusion survey GNNs" />
                            </div>
                          </div>
                          <div className="very-small-vertical-space"></div>

                          <div className="publication-card animatable fadeInUp accent-box d-flex" style={{ display: 'flex' }}>
                            <div className="text-section" style={{ flex: 1 }}>
                              <h6>SECRYPT (2022)</h6>
                              <p>
                                <a className="card-title" href="https://www.researchgate.net/publication/361002272_PhishGNN_A_Phishing_Website_Detection_Framework_using_Graph_Neural_Networks" target="_blank" rel="noopener noreferrer">
                                  PhishGNN: A Phishing Website Detection Framework using Graph Neural Networks
                                </a>
                              </p>
                              <span><u>Tristan Bilot</u>, Grégoire Geis, Badis Hammi</span>
                              <br />
                              <a href="https://www.researchgate.net/publication/361002272_PhishGNN_A_Phishing_Website_Detection_Framework_using_Graph_Neural_Networks" target="_blank" rel="noopener noreferrer">Paper</a> 
                              <a href="https://github.com/TristanBilot/phishGNN" target="_blank" rel="noopener noreferrer">Code</a>
                            </div>
                            <div className="image-section d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
                              <img className="publication-card__image" src={kernel} alt="PhishGNN" />
                            </div>
                          </div>
                          <div className="very-small-vertical-space"></div>

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
