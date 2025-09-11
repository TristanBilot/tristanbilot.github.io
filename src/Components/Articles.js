import React, { Component } from 'react';
import '../Styles/articles.sass';

class Articles extends Component {

  render() {
    return (
      <div id="articles" className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 col-0"></div>
            <div className="col-sm-8 col-12">
              <div className="small-vertical-space"></div>
              <div className="block">
                <h1 className="title animate-letters-accent animatable fadeInUp">Medium articles</h1>
                <blockquote class="blockquote">
                  <p className='span-title-comment'>I use to write <span className='accent-color'> Medium articles</span> on various engineering/programming topics, to <span className='accent-color'>help the community</span> on issues I encountered over the last years.</p>
                </blockquote>
                <div className="very-small-vertical-space"></div>

                <div className="row animatable fadeInUp">
                  <div className="col-md-12">
                    <section id="blog" class="accent-box">
                      <ul class="blog__slider">
                        {/* posts */}
                      </ul>
                      <ul class="blog__counter">
                        {/* counters */}
                      </ul>
                    </section>
                    <div class="more-articles animatable fadeInUp">
                      <a className='accent-underline' href="https://tristanbilot.medium.com" alt="link to my medium page" target="_blank" rel="noopener noreferrer"> All articles...</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-0"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
