import React, { Component } from 'react';
import '../Styles/footer.scss';

class Footer extends Component {

  render() {
    return (
      <div className="header">
        <div className="vertical-space"></div>
        <div class="footer-card">
          <h2>
            <span className="footer-msg"><span className="accent-color"> Developed</span> with ❤️ in Paris</span>
          </h2>
        </div>
        <div className="small-vertical-space"></div>
      </div>
    );
  }
}

export default Footer;
