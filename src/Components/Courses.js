import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import '../Styles/posts.sass';

// `to` uses the in-app router; `href` leaves the site.
const SERIES = [
  {
    title: 'Deep Learning from scratch',
    posts: [
      { to: '/prerequisites', title: 'Prerequisites', image: '/courses/prerequisites/img/main.jpg' },
      { to: '/chain-rule', title: 'Chain rule and computation graphs', image: '/courses/chain-rule/img/g6.jpg' },
      { to: '/autodiff', title: 'Automatic differentiation engine from scratch', image: '/courses/autodiff/img/main.jpg' },
      { to: '/optimization', title: 'Optimization and training', image: '/courses/optimization/img/main.jpg' },
      { to: '/xor-sine', title: 'XOR and sine problems', image: '/courses/xor-sine/img/g1.jpg' },
    ],
  },
  {
    title: 'Project websites',
    posts: [
      {
        href: 'https://ubc-provenance.github.io/PIDSMaker/',
        title: 'PIDSMaker',
        image: '/courses/phishgnn/img/pidsmaker.png',
      },
      {
        href: 'https://mlx-graphs.github.io/mlx-graphs/',
        title: 'mlx-graphs',
        image: '/courses/phishgnn/img/mlx-graphs.svg',
      },
      { to: '/phishgnn', title: 'PhishGNN-22 dataset', image: '/courses/phishgnn/img/main.png' },
    ],
  },
];

const PostCard = ({ post, index }) => {
  const inner = (
    <>
      <div className="post-card__thumb">
        <img src={post.image} alt="" loading="lazy" />
      </div>
      <div className="post-card__footer">
        <span className="post-card__nb" aria-hidden="true">
          {index + 1}
        </span>
        <h4 className="post-card__title">{post.title}</h4>
      </div>
    </>
  );

  return post.to ? (
    <Link className="post-card card-surface" to={post.to}>
      {inner}
    </Link>
  ) : (
    <a className="post-card card-surface" href={post.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
};

const Courses = () => (
  <Section
    id="courses"
    title="Blog Posts"
    intro="Notes on the theory and fundamentals of deep learning, including how to implement a simple autodiff engine from scratch using only Python, numpy and maths."
  >
    {SERIES.map((series) => (
      <div className="post-series" key={series.title}>
        <h3 className="post-series__title animatable fadeInUp">{series.title}</h3>
        <div className="post-grid animatable fadeInUp">
          {series.posts.map((post, i) => (
            <PostCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    ))}
  </Section>
);

export default Courses;
