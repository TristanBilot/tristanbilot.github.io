import React from 'react';
import Section from './Section';
import '../Styles/collaborations.sass';

const EMAIL = 'tbilot@cs.ubc.ca';

const TOPICS = [
  'Host and network intrusion detection',
  'Graph neural networks & temporal graph learning',
  'Self-supervised learning for security',
  'Foundation models & LLMs for security',
  'Agentic AI for security',
];

const Collaborations = () => (
  <Section
    id="collaborations"
    title="Collaborations"
    intro="I'm always happy to work with curious, motivated people."
  >
    <div className="collaboration-card card-surface animatable fadeInUp">
      <p>
        If you are a <b>researcher</b> interested in any of the topics below, or an <b>excellent and motivated student</b>{' '}
        looking for a research project, an internship, or a thesis in my area, please feel free to reach out. I am open
        to collaborations and always glad to discuss new ideas.
      </p>

      <ul className="collaboration-card__topics">
        {TOPICS.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      <a className="collaboration-card__cta" href={`mailto:${EMAIL}`}>
        <i className="fa-solid fa-envelope" aria-hidden="true" /> Get in touch
      </a>
    </div>
  </Section>
);

export default Collaborations;
