import React, { useState } from 'react';
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
      { name: 'Shahrear Iqba' },
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
    links: [{ href: 'https://hal.science/hal-04186579/document', icon: 'fa-solid fa-scroll', label: 'Paper' }],
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
  <article className="publication-card animatable fadeInUp accent-box d-flex">
    <div className="text-section">
      {publication.award && (
        <p className="publication-card__award">
          <i className="fa-solid fa-award" /> <b>{publication.award}</b>
        </p>
      )}
      <h6 className="publication-card__venue">{publication.venue}</h6>
      <h3 className="card-title">{publication.title}</h3>
      <AuthorList authors={publication.authors} />
      <div className="publication-card__links">
        {publication.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            <i className={link.icon} /> {link.label}
          </a>
        ))}
      </div>
    </div>
    <div className="image-section d-flex align-items-center justify-content-center">
      <img className="publication-card__image" src={publication.image} alt={`Figure from ${publication.title}`} />
    </div>
  </article>
);

const Publications = () => {
  const [showAll, setShowAll] = useState(false);

  const selected = PUBLICATIONS.filter((p) => p.selected);
  const rest = PUBLICATIONS.filter((p) => !p.selected);
  const visible = showAll ? PUBLICATIONS : selected;

  return (
    <div id="publications" className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="small-vertical-space"></div>
          <div className="col-sm-3 col-0"></div>
          <div className="col-sm-6 col-12">
            <div className="block">
              <div className="vertical-space-only-mobile"></div>
              <h1 className="title fadeInUp">Publications</h1>
              <blockquote className="blockquote">
                <p className="span-title-comment">
                  Publications related to my <span className="accent-color">research work</span>. A full list is also on{' '}
                  <a className="accent-color" href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
                    Google Scholar
                  </a>
                  .
                </p>
              </blockquote>
              <div className="very-small-vertical-space"></div>
              <div className="row animatable fadeInUp">
                <div className="col-md-12">
                  {visible.map((publication) => (
                    <React.Fragment key={publication.id}>
                      <PublicationCard publication={publication} />
                      <div className="very-small-vertical-space"></div>
                    </React.Fragment>
                  ))}

                  {rest.length > 0 && (
                    <div className="publications-toggle">
                      <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
                        {showAll ? (
                          <>
                            Show fewer publications <i className="fa-solid fa-chevron-up" />
                          </>
                        ) : (
                          <>
                            Show all {PUBLICATIONS.length} publications <i className="fa-solid fa-chevron-down" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
