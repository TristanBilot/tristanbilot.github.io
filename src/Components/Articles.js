import React from 'react';
import Section from './Section';
import '../Styles/articles.sass';

const MEDIUM_URL = 'https://tristanbilot.medium.com';

/*
 * The list is filled at runtime by public/scripts/fetch_articles.js, which
 * pulls the Medium RSS feed and writes cards into `.blog__slider`.
 */
const Articles = () => (
  <Section
    id="articles"
    title="Medium articles"
    intro="I write on various engineering and programming topics, to help the community with issues I ran into over the last years."
  >
    <section id="blog" className="animatable fadeInUp">
      <ul className="blog__slider" />
      <ul className="blog__counter" />
    </section>

    <div className="more-articles animatable fadeInUp">
      <a className="accent-underline" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
        All articles on Medium →
      </a>
    </div>
  </Section>
);

export default Articles;
