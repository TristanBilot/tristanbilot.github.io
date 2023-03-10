import React, { Component } from 'react';
import '../Styles/global.sass'
import '../Styles/background.sass';
import '../Styles/timeline.scss'
import '../Styles/letter-hover-effect.scss'

class Background extends Component {

  render() {
    return (
      <div id="background" className="header">
        <div class="container-fluid">
          <div class="row">
          <div className="col-sm-2 col-1"></div>
            <div className="col-sm-8 col-10">
            <div className="vertical-space"></div>
            <div className="block">
                <h1 class="title fadeInUp">Background</h1>
                    <blockquote class="blockquote">
                      <p className='span-title-comment'>A brief overview of my<span className='accent-color'> academic</span> and <span className='accent-color'>professional</span> experiences.</p>
                    </blockquote>
                    <div className="small-vertical-space"></div>
                    <div class="container-fluid animatable fadeInUp">
                        <div class="row example-centered">
                        <ul class="timeline timeline-centered">
                        <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>Since Oct. 2022</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-grad-icon-from-js"><i class="fas fa-graduation-cap"></i> &nbsp;PhD student</h3>
                                    <p>Université Paris-Saclay, ISEP, Iriguard</p>
                                    <p>PhD in Computer Science on Graph Deep Learning applied to the detection of cyberattacks and vulnerabilities. Advisor: Khaldoun Al Agha.</p>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2021-2022</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-grad-icon-from-js"><i class="fas fa-graduation-cap"></i> &nbsp;Student Researcher</h3>
                                    <p>EPITA </p>
                                    <p>Research in Machine Learning and Deep Learning applied to Cybersecurity. Advisor: Badis Hammi.</p>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2021-2022 (1y 4months)</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-grad-icon-from-js"><i class="fas fa-briefcase"></i>&nbsp;Data Engineer<span className='background-subscript'> apprentice</span></h3>
                                    <p>Carrefour-Google AI Lab</p>
                                    <p>At the lab, I mainly worked on time-series ML models optimization and deployment based on GCP, k8s, Docker and Airflow. I divided the training time of 2 projects by a factor of 4 and 2. I also developed a Python module for fast data fetching with up to 10x faster fetching times.</p>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2019-2021 (1y 8months)</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-work-icon-from-js"><i class="fas fa-briefcase"></i>&nbsp;Software Engineer <span className='background-subscript'>apprentice</span></h3>
                                    <p>Carrefour</p>
                                    <p>Development of new features for Carrefour iOS application (1.5M + monthly users) within a Scrum team. Swift programming in TDD + Clean Architecture. Integration of AI technologies developed with Google into the Lab. Participation in Hackatons and agile meetings.</p>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2019-2022</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-grad-icon-from-js"><i class="fas fa-graduation-cap"></i> &nbsp;Engineering Degree</h3>
                                    <p>EPITA </p>
                                    <p>Master of Science in Computer Science in apprenticeship, working for Carrefour half-time. I studied a lot of very technical subjects such as kernel and system programming, reverse engineering, cryptographic methods, pentesting, malware and binary analysis, networking, Maths related to Computer Science, C, ASM, C++, Python, Java...</p>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2019, 4 months</span><br></br>
                                    <span>Levallois-Perret</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-work-icon-from-js"><i class="fas fa-briefcase"></i> &nbsp;Software Engineer <span className='background-subscript'>intern</span></h3>
                                    <p>Micropole</p>
                                    <p>I developed new features for a website, improved performance and optimized web-services. I also worked on back-end functionalities deployed continuously on a Cloud.</p>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2017-2019</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-grad-icon-from-js"><i class="fas fa-graduation-cap"></i>&nbsp; DUT in Computer Science </h3>
                                    <p>Université Paris-Cité (ex Descartes) </p>
                                    <p>I studied Computer Science for 2 years at IUT Paris Descartes, the Paris Institute of Technology. Basically two years of hard-working on both low and high level programming and Maths.</p>
                                </div>
                            </li>
                            {/* <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2015-2017</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-grad-icon-from-js"><i class="fas fa-graduation-cap"></i> &nbsp;Baccalaureate</h3>
                                    <p>Lycée Sainte Thérèse </p>
                                    <p>High school diploma with honors, majoring in Computer Science, Maths, Physics.</p>
                                </div>
                            </li> */}
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                    <span>2013</span><br></br>
                                    <span>Paris</span>
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-code-icon-from-js"><i class="fas fa-code"></i>&nbsp; My first line of code </h3>
                                </div>
                            </li>
                            <li class="timeline-item animatable fadeInUp">
                                <div class="timeline-info">
                                </div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h3 class="timeline-title add-code-icon-from-js">...</h3>
                                </div>
                            </li>

                            <li class="timeline-item animatable fadeInUp period">
                                    <div class="timeline-info"></div>
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h2 class="timeline-title birth add-baby-icon-from-js"><i class="fas fa-baby"></i> &nbsp;Hello, World!</h2>
                                    </div>
                                </li>
                            {/* <li class="timeline-item period">
                                <div class="timeline-info"></div>
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h2 class="timeline-title">April 2016</h2>
                                </div>
                            </li> */}
                        </ul>
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

export default Background;
