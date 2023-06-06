import React, { Component } from 'react';
import '../Styles/contact.sass';

class Contact extends Component {

  render() {
    return (
      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 col-1"></div>
            <div className="col-sm-8 col-10">
            <div className="vertical-space"></div>
                <div className="block">
                    <h1 className="title  fadeInUp">Reach me</h1>
                    <div className="flexed-icons animatable bounceInRight">
                        <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="0771897506">
                            <span class="fa-stack fa-1x">
                                <a href="tel:+33771897506">
                                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                                    <i class="fas fa-mobile-alt fa-stack-1x"></i>
                                </a>
                            </span>
                        </span>

                        <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="bilot.tristan@hotmail.fr">
                            <span class="fa-stack fa-1x">
                                <a href="mailto:bilot.tristan@hotmail.fr">
                                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                                    <i class="fas fa-envelope fa-stack-1x"></i>
                                </a>
                            </span>
                        </span>

                        <span class="fa-stack fa-1x">
                            <a href="https://www.linkedin.com/in/tristan-bilot/">
                                <i class="fa fa-circle fa-stack-2x icon-background"></i>
                                <i class="fab fa-linkedin fa-stack-1x"></i>
                            </a>
                        </span>

                        <span class="fa-stack fa-1x">
                            <a href="https://github.com/TristanBilot">
                                <i class="fa fa-circle fa-stack-2x icon-background"></i>
                                <i class="fab fa-github fa-stack-1x"></i>
                            </a>
                        </span>
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

export default Contact;
