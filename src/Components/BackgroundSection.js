import { Component } from 'react';
import '../Styles/background-section.sass';

const timeline = [
  {
    role: 'Postdoctoral Fellow',
    org: 'University of British Columbia',
    year: '2026',
    location: 'Vancouver, Canada',
    logo: process.env.PUBLIC_URL + '/courses/phishgnn/img/ubc.png',
    url: 'https://www.cs.ubc.ca/',
  },
  {
    role: 'Applied Scientist Intern',
    org: 'Amazon Web Services',
    year: '2025',
    location: 'New York, USA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    url: 'https://aws.amazon.com/',
  },
  {
    role: 'Ph.D. in Computer Science',
    org: 'Université Paris-Saclay',
    year: '2022-2025',
    location: 'Paris, France',
    logo: process.env.PUBLIC_URL + '/courses/phishgnn/img/saclay.png',
    url: 'https://www.universite-paris-saclay.fr/',
  },
  {
    role: "Master's (Diplôme d'Ingénieur) in CS",
    org: 'EPITA',
    year: '2019-2022',
    location: 'Paris, France',
    logo: process.env.PUBLIC_URL + '/courses/phishgnn/img/epita.png',
    url: 'https://www.epita.fr/',
  },
  {
    role: 'Data Engineer / Software Engineer Apprentice',
    org: 'Carrefour-Google AI Lab',
    year: '2019–2022',
    location: 'Paris, France',
    logo: process.env.PUBLIC_URL + '/courses/phishgnn/img/carrefour.png',
    url: 'https://www.thinkwithgoogle.com/intl/fr-fr/strategies-marketing/donnees-et-mesure/carrefour-la-data-pour-retrouver-le-bon-sens-commercant/',
  },
];

class BackgroundSection extends Component {
  render() {
    return (
      <div id="background" className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="small-vertical-space"></div>
            <div className="col-sm-3 col-0"></div>
            <div className="col-sm-6 col-12">
              <div className="block background-section">
                <div className="vertical-space-only-mobile"></div>
                <h1 className="title fadeInUp">Background</h1>
                <div className="very-small-vertical-space"></div>
                <div className="timeline animatable fadeInUp">
                  {timeline.map((item, i) => (
                    <div className="timeline-item" key={i}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-logo"
                      >
                        <img src={item.logo} alt={item.org} />
                      </a>
                      <div className="timeline-content">
                        <div className="timeline-role">{item.role}</div>
                        <div className="timeline-org">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.org}
                          </a>
                        </div>
                        <div className="timeline-details">
                          {item.location} · {item.year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-0"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BackgroundSection;
