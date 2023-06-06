import React, { Component } from 'react';
import '../Styles/header.sass';
import '../Styles/toggle-btn.scss';
import me from '../resources/me3.jpeg';

class Header extends Component {

  render() {
    return (
      <div id="intro" className="header full-height">

        <div className="container-fluid position-relative header-global">
          <div className="row align-items-center full-height">
            <div className="col-lg-2 col-1 col-lg-"></div>
            <div className="col-lg-8 col-10">

              <div class="row" itemProp="author" itemScope="" itemType="http://schema.org/Person" itemRef="person-email">
                <div class="col-xs-12 col-md-4">
                  <div id="profile">

                    <div class="portrait" style={{ backgroundImage: "url(" + me + ")" }}>
                    </div>

                    <div class="portrait-title">
                      <h2 itemProp="name">Tristan Bilot</h2>
                      <h3 itemProp="jobTitle">PhD student &amp; Research Scientist</h3>
                    </div>

                    <ul class="network-icon" aria-hidden="true">
                      <li>
                        <a itemProp="sameAs" href="mailto:tristan.bilot@universite-paris-saclay.fr" target="_blank" rel="noopener">
                          <i class="fa fa-envelope big-icon"></i>
                        </a>
                      </li>
                      <li>
                        <a itemProp="sameAs" href="https://scholar.google.fr/citations?user=ijVNAGYAAAAJ&hl=fr&oi=ao" target="_blank" rel="noopener">
                          <i class="ai ai-google-scholar big-icon"></i>
                        </a>
                      </li>
                      <li>
                        <a itemProp="sameAs" href="https://github.com/TristanBilot" target="_blank" rel="noopener">
                          <i class="fab fa-github big-icon"></i>
                        </a>
                      </li>
                      <li>
                        <a itemProp="sameAs" href="https://www.linkedin.com/in/tristan-bilot/" target="_blank" rel="noopener">
                          <i class="fab fa-linkedin big-icon"></i>
                        </a>
                      </li>
                      <li>
                        <a itemProp="sameAs" href="https://tristanbilot.medium.com" target="_blank" rel="noopener">
                          <i class="fab fa-medium big-icon"></i>
                        </a>
                      </li>
                      {/* <li>
                        <a itemProp="sameAs" href="files/cv.pdf" target="_blank" rel="noopener">
                          <i class="ai ai-cv big-icon"></i>
                        </a>
                      </li> */}

                    </ul>

                  </div>
                </div>
                <div class="col-xs-12 col-md-8" itemProp="description">



                  <h1 id="about-me">About me</h1>
                  <p></p>

                  <p>I am a PhD student from <a className='word-accent' href="https://www.universite-paris-saclay.fr/en/about/universite-paris-saclay"> Université Paris-Saclay</a>, member of <a className='word-accent' href="https://www.lisn.upsaclay.fr/">LISN</a> & <a className='word-accent' href="https://www.isep.fr/laboratoire-lisite-2-2/">LISITE</a> laboratories and Research Scientist at <a className='word-accent' href="https://www.iriguard.com/"> Iriguard</a>.</p>

                  <p>My main research field is about Graph Deep Learning techniques applied to Cybersecurity.</p>

                  <p>In life, I'm interested in Cosmology, life origins and traveling!</p>


                  <div class="row">


                    <div class="col-sm-5">
                      <h3>Recent Experience</h3>
                      <ul class="ul-edu fa-ul">

                        <li>
                          <i class="fa-li fa fa-briefcase"></i>
                          <div class="description">
                            <p class="course">Research Scientist</p>

                            <a href="https://www.iriguard.com/">
                              <p class="institution">Iriguard</p>
                            </a>

                          </div>
                        </li>

                        <li>
                          <i class="fa-li fa fa-briefcase"></i>
                          <div class="description">
                            <p class="course">Data Engineer apprentice</p>

                            <a href="https://www.carrefour.fr/">
                              <p class="institution">Carrefour-Google AI Lab</p>
                            </a>

                          </div>
                        </li>

                      </ul>
                    </div>



                    <div class="col-sm-7">
                      <h3>Education</h3>
                      <ul class="ul-edu fa-ul">

                        <li>
                          <i class="fa-li fa fa-graduation-cap"></i>
                          <div class="description">
                            <p class="course">PhD student</p>

                            <a href="https://www.universite-paris-saclay.fr/en/about/universite-paris-saclay">
                              <p class="institution">Université Paris-Saclay</p>
                            </a>

                          </div>
                        </li>

                        <li>
                          <i class="fa-li fa fa-graduation-cap"></i>
                          <div class="description">
                            <p class="course">Engineer in Computer Science (MSc)</p>

                            <a href="http://www.epita.fr">
                              <p class="institution">EPITA</p>
                            </a>

                          </div>
                        </li>

                      </ul>
                    </div>


                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-2 col-1"></div>
          </div>
        </div>
        <div class="background">
          <div class="toggle-body">
            <div id="toggle-btn" class="toggle-btn"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
