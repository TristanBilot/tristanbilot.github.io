import React from 'react';
import '../Styles/global.sass';

/*
 * Shared page section.
 *
 * `id` and the `header` class are load-bearing: public/scripts/update-navbar.js
 * highlights the nav item whose class matches the id of the section in view.
 *
 * Every section spans the same width so headings share one left edge; blocks
 * that need a narrower reading measure (prose, the news list) cap themselves.
 */
const Section = ({ id, title, intro, children }) => (
  <section id={id} className="header section">
    <div className="section__inner">
      <div className="section__head animatable fadeInUp">
        <h2 className="section__title">{title}</h2>
        {intro && <p className="section__intro">{intro}</p>}
      </div>
      <div className="section__body">{children}</div>
    </div>
  </section>
);

export default Section;
