import React from 'react';
import Section from './Section';
import '../Styles/news.sass';

const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

// `date` is the ISO value for <time>; `label` is what the reader sees.
const NEWS = [
  {
    date: '2026-02-23',
    label: 'Jul 2026',
    emoji: '🏆',
    body: (
      <>
        Won the 
        {' '}
        <A href="https://www.linkedin.com/feed/update/urn:li:activity:7480922858312032257/">
          Impact Award
        </A>{' '}
        at the <b>Starthèse Start'up Pitch-iD</b> competition.
      </>
    ),
  },
  {
    date: '2026-07-11',
    label: 'Feb 2026',
    emoji: '🇺🇸',
    body: (
      <>
        Presented <b>PIDSMaker</b> at the <b>NDSS 2026</b> PRISM workshop.
      </>
    ),
  },
  {
    date: '2026-02-02',
    label: 'Feb 2026',
    emoji: '🇨🇦',
    body: (
      <>
        Joined the University of British Columbia (<b>UBC</b>) as a <b>Postdoctoral Fellow</b>.
      </>
    ),
  },
  {
    date: '2025-11-17',
    label: 'Nov 2025',
    emoji: '🎓',
    body: (
      <>
        Successfully <b>defended my PhD</b> at Université Paris-Saclay.
      </>
    ),
  },
  {
    date: '2025-10-06',
    label: 'Oct 2025',
    emoji: '🇺🇸',
    body: (
      <>
        Joined <b>Amazon</b> as an <b>Applied Scientist Intern</b> in <b>New York City</b>.
      </>
    ),
  },
  {
    date: '2025-08-27',
    label: 'Aug 2025',
    emoji: '📑',
    body: (
      <>
        Our{' '}
        <A href="https://www.usenix.org/publications/loginonline/toward-practical-and-usable-provenance-based-intrusion-detection-systems">
          USENIX ;login: article
        </A>{' '}
        is out.
      </>
    ),
  },
  {
    date: '2025-08-13',
    label: 'Aug 2025',
    emoji: '📑',
    body: (
      <>
        We have <b>two papers</b> accepted at <b>USENIX Sec'25</b>.
      </>
    ),
  },
  {
    date: '2025-06-05',
    label: 'Jun 2025',
    emoji: '💻',
    body: (
      <>
        <A href="https://github.com/ubc-provenance/PIDSMaker">PIDSMaker</A> is open-source.
      </>
    ),
  },
  {
    date: '2025-05-03',
    label: 'May 2025',
    emoji: '🎤',
    body: (
      <>
        Gave a <b>talk</b> on AI for security at the <b>GenAI Meetup Morocco</b>.
      </>
    ),
  },
  {
    date: '2024-09-18',
    label: 'Sep 2024',
    emoji: '🏆',
    body: (
      <>
        Received the <A href="https://www.iwsec.org/2024/">best paper award</A> at IWSEC'24.
      </>
    ),
  },
  {
    date: '2024-02-01',
    label: 'Feb 2024',
    emoji: '💻',
    body: (
      <>
        <A href="https://github.com/mlx-graphs/mlx-graphs">mlx-graphs</A> is open-source.
      </>
    ),
  },
];

const News = () => (
  <Section id="news" title="News">
    <ol className="news-list animatable fadeInUp">
      {NEWS.map((item) => (
        <li className="news-item" key={item.date + item.label}>
          <time className="news-item__date" dateTime={item.date}>
            {item.label}
          </time>
          <span className="news-item__emoji" aria-hidden="true">
            {item.emoji}
          </span>
          <p className="news-item__body">{item.body}</p>
        </li>
      ))}
    </ol>
  </Section>
);

export default News;
