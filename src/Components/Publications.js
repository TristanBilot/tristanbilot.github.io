import React, { useState } from 'react';
import Section from './Section';
import phishgnn from '../resources/publications/phishgnn_figure.png';
import intrusion_survey from '../resources/publications/intrusion_survey_figure.png';
import malware_survey from '../resources/publications/malware_survey_figure.png';
import csnet from '../resources/publications/csnet.png';
import feae from '../resources/publications/feae.png';
import orthrus from '../resources/publications/orthrus.png';
import velox from '../resources/publications/velox.png';
import pidsmaker from '../resources/publications/pidsmaker.png';
import '../Styles/publications.sass';

const SCHOLAR_URL = 'https://scholar.google.fr/citations?user=ijVNAGYAAAAJ&hl=en&oi=ao';

const ME = 'Tristan Bilot';

// `selected: true` papers are always visible; the rest appear behind the
// "show all publications" toggle. Authors marked `equal` render a shared
// joint-first-author asterisk.
const PUBLICATIONS = [
  {
    id: 'pidsmaker',
    venue: 'KDD 2026 (Datasets & Benchmarks)',
    title: 'PIDSMaker: Building and Evaluating Provenance-based Intrusion Detection Systems',
    authors: [{ name: ME }, { name: 'Baoxiang Jiang' }, { name: 'Thomas Pasquier' }],
    image: pidsmaker,
    selected: true,
    links: [
      { href: 'https://arxiv.org/pdf/2601.22983', icon: 'fa-solid fa-scroll', label: 'Paper' },
      { href: 'https://github.com/ubc-provenance/PIDSMaker', icon: 'fa-brands fa-github', label: 'Code' },
    ],
  },
  {
    id: 'velox',
    venue: "USENIX Security Symposium 2025 (USENIX Sec'25)",
    title:
      'Sometimes Simpler is Better: A Comprehensive Analysis of State-of-the-Art Provenance-Based Intrusion Detection Systems',
    authors: [
      { name: ME },
      { name: 'Baoxiang Jiang' },
      { name: 'Zefeng Li' },
      { name: 'Nour El Madhoun' },
      { name: 'Khaldoun Al Agha' },
      { name: 'Anis Zouaoui' },
      { name: 'Thomas Pasquier' },
    ],
    image: velox,
    selected: true,
    links: [
      {
        href: 'https://www.usenix.org/system/files/usenixsecurity25-bilot.pdf',
        icon: 'fa-solid fa-scroll',
        label: 'Paper',
      },
      { href: 'https://github.com/ubc-provenance/PIDSMaker', icon: 'fa-brands fa-github', label: 'Code' },
      { href: 'https://tristanbilot.github.io/public_content/poster_velox.pdf', icon: 'fa-solid fa-image', label: 'Poster' },
      { href: 'https://www.usenix.org/system/files/sec25_slides_bilot.pdf', icon: 'fa-solid fa-file-pdf', label: 'Slides' },
      { href: 'https://www.youtube.com/watch?v=Or_iAucWqT4', icon: 'fa-brands fa-youtube', label: 'Video' },
    ],
  },
  {
    id: 'orthrus',
    venue: "USENIX Security Symposium 2025 (USENIX Sec'25)",
    title: 'ORTHRUS: Achieving High Quality of Attribution in Provenance-based Intrusion Detection Systems',
    authors: [
      { name: 'Baoxiang Jiang', equal: true },
      { name: ME, equal: true },
      { name: 'Nour El Madhoun' },
      { name: 'Khaldoun Al Agha' },
      { name: 'Anis Zouaoui' },
      { name: 'Shahrear Iqbal' },
      { name: 'Xueyuan Han' },
      { name: 'Thomas Pasquier' },
    ],
    image: orthrus,
    selected: true,
    links: [
      {
        href: 'https://www.usenix.org/system/files/usenixsecurity25-jiang-baoxiang.pdf',
        icon: 'fa-solid fa-scroll',
        label: 'Paper',
      },
      { href: 'https://github.com/ubc-provenance/orthrus', icon: 'fa-brands fa-github', label: 'Code' },
      { href: 'https://www.usenix.org/system/files/sec25_slides_jiang-baoxiang.pdf', icon: 'fa-solid fa-file-pdf', label: 'Slides' },
      { href: 'https://www.youtube.com/watch?v=_FpCefZeObw', icon: 'fa-brands fa-youtube', label: 'Video' },
    ],
  },
  {
    id: 'feae',
    venue: 'International Workshop on Security - IWSEC (2024)',
    award: 'Best paper award',
    title: 'Few Edges Are Enough: Few-Shot Network Attack Detection with Graph Neural Networks',
    authors: [{ name: ME }, { name: 'Nour El Madhoun' }, { name: 'Khaldoun Al Agha' }, { name: 'Anis Zouaoui' }],
    image: feae,
    selected: true,
    links: [
      { href: 'https://dl.acm.org/doi/abs/10.1007/978-981-97-7737-2_15', icon: 'fa-solid fa-scroll', label: 'Paper' },
      { href: 'https://github.com/TristanBilot/feae', icon: 'fa-brands fa-github', label: 'Code' },
      { href: '/public_content/slides_FEAE.pdf', icon: 'fa-solid fa-file-pdf', label: 'Slides' },
    ],
  },
  {
    id: 'malware-survey',
    venue: 'ACM Computing Surveys (2024)',
    title: 'A Survey on Malware Detection with Graph Representation Learning',
    authors: [{ name: ME }, { name: 'Nour El Madhoun' }, { name: 'Khaldoun Al Agha' }, { name: 'Anis Zouaoui' }],
    image: malware_survey,
    selected: true,
    links: [{ href: 'https://dl.acm.org/doi/10.1145/3664649', icon: 'fa-solid fa-scroll', label: 'Paper' }],
  },
  {
    id: 'intrusion-survey',
    venue: 'IEEE Access (2023)',
    title: 'Graph Neural Networks for Intrusion Detection: A Survey',
    authors: [{ name: ME }, { name: 'Nour El Madhoun' }, { name: 'Khaldoun Al Agha' }, { name: 'Anis Zouaoui' }],
    image: intrusion_survey,
    selected: false,
    links: [
      {
        href: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10123384',
        icon: 'fa-solid fa-scroll',
        label: 'Paper',
      },
    ],
  },
  {
    id: 'csnet',
    venue: 'CSNet (2023)',
    title:
      'A Benchmark of Graph Augmentations for Contrastive Learning-Based Network Attack Detection with Graph Neural Networks',
    authors: [{ name: ME }, { name: 'Nour El Madhoun' }, { name: 'Khaldoun Al Agha' }, { name: 'Anis Zouaoui' }],
    image: csnet,
    selected: false,
    links: [
      { href: 'https://hal.science/hal-04186579/document', icon: 'fa-solid fa-scroll', label: 'Paper' },
      { href: 'https://tristanbilot.github.io/public_content/poster_montreal.pdf', icon: 'fa-solid fa-image', label: 'Poster' },
    ],
  },
  {
    id: 'phishgnn',
    venue: 'SECRYPT (2022)',
    title: 'PhishGNN: A Phishing Website Detection Framework using Graph Neural Networks',
    authors: [{ name: ME }, { name: 'Grégoire Geis' }, { name: 'Badis Hammi' }],
    image: phishgnn,
    selected: false,
    links: [
      {
        href: 'https://www.researchgate.net/publication/361002272_PhishGNN_A_Phishing_Website_Detection_Framework_using_Graph_Neural_Networks',
        icon: 'fa-solid fa-scroll',
        label: 'Paper',
      },
      { href: 'https://github.com/TristanBilot/phishGNN', icon: 'fa-brands fa-github', label: 'Code' },
      { href: '/public_content/slides_PhishGNN.pdf', icon: 'fa-solid fa-file-pdf', label: 'Slides' },
    ],
  },
];

// Inline SVG rather than a Font Awesome <i>: the Font Awesome JS bundle swaps
// every <i> for an <svg> behind React's back, so re-rendering an <i> whose
// class changes makes React remove a node that is no longer in the DOM and
// crashes the whole tree. The chevron flips with CSS instead.
const Chevron = ({ up }) => (
  <svg
    className={`publications-toggle__chevron${up ? ' publications-toggle__chevron--up' : ''}`}
    viewBox="0 0 16 16"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="3,6 8,11 13,6" />
  </svg>
);

const AuthorList = ({ authors }) => {
  const hasEqualContrib = authors.some((a) => a.equal);
  return (
    <p className="publication-card__authors">
      {authors.map((author, i) => (
        <React.Fragment key={author.name}>
          {i > 0 && ', '}
          {author.name === ME ? <u>{author.name}</u> : author.name}
          {author.equal && <sup>*</sup>}
        </React.Fragment>
      ))}
      {hasEqualContrib && (
        <span className="publication-card__note">
          {' '}
          (<sup>*</sup>Joint first author)
        </span>
      )}
    </p>
  );
};

const PublicationCard = ({ publication }) => (
  <article className="publication-card card-surface animatable fadeInUp">
    <div className="publication-card__body">
      <div className="publication-card__meta">
        <span className="publication-card__venue">{publication.venue}</span>
        {publication.award && (
          <span className="publication-card__award">
            <i className="fa-solid fa-award" aria-hidden="true" /> {publication.award}
          </span>
        )}
      </div>

      <h3 className="card-title">{publication.title}</h3>
      <AuthorList authors={publication.authors} />

      <div className="publication-card__links">
        {publication.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            <i className={link.icon} aria-hidden="true" /> {link.label}
          </a>
        ))}
      </div>
    </div>

    <div className="publication-card__figure">
      <img
        className="publication-card__image"
        src={publication.image}
        alt={`Figure from ${publication.title}`}
        loading="lazy"
      />
    </div>
  </article>
);

const Publications = () => {
  const [showAll, setShowAll] = useState(false);

  const rest = PUBLICATIONS.filter((p) => !p.selected);
  const visible = showAll ? PUBLICATIONS : PUBLICATIONS.filter((p) => p.selected);

  const intro = (
    <>
      Publications related to my research work. A full list is also on{' '}
      <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
        Google Scholar
      </a>
      .
    </>
  );

  return (
    <Section id="publications" title="Publications" intro={intro}>
      <div className="publication-list">
        {visible.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="publications-toggle">
          <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
            <span>{showAll ? 'Show fewer publications' : `Show all ${PUBLICATIONS.length} publications`}</span>
            <Chevron up={showAll} />
          </button>
        </div>
      )}
    </Section>
  );
};

export default Publications;
