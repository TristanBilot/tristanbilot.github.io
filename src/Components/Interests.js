import React, { Component } from 'react';
import '../Styles/interests.sass';

class Interests extends Component {

  render() {
    return (
      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 col-1"></div>
            <div className="col-sm-8 col-10">
            <div className="vertical-space"></div>
                <div className="block">
                    <h1 className="title  fadeInUp">Personal interests</h1>
                    <div className="small-vertical-space"></div>
                    <div className="row animatable fadeInUp">
                        <div className="col-sm-2 col-0"></div>
                        <div className="col-sm-10 col-12">
                            <div className="interests-icons">
                            <div className="interests-text">
                                <p>
                                    <div>
                                        <span><i class="fas fa-brain"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="accent-color">&#36;&#123;</span>
                                        <span>Artificial Intelligence</span>
                                        <span className="accent-color">&#125;</span>
                                    </div>
                                </p>
                                <p >
                                    <div>
                                    <span><i class="fas fa-atom"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="accent-color">&#36;&#123;</span>
                                        <span>Quantum Physics</span>
                                        <span className="accent-color">&#125;</span>
                                    </div>
                                </p>
                                <p>
                                    <div>
                                        <span><i class="fas fa-yin-yang"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="accent-color">&#36;&#123;</span>
                                        <span>Spirituality</span>
                                        <span className="accent-color">&#125;</span>
                                    </div>
                                </p>
                                <p>
                                    <div>
                                        <span><i class="fas fa-leaf"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="accent-color">&#36;&#123;</span>
                                        <span>Trips & Nature</span>
                                        <span className="accent-color">&#125;</span>
                                    </div>
                                </p>
                                </div>
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

export default Interests;
