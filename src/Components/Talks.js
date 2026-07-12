import React from 'react';
import Section from './Section';
import '../Styles/talks.sass';

// Newest first. `links` mirror the CV entries (slides / video / poster).
const TALKS = [
  {
    host: 'École Polytechnique de Louvain',
    title: 'PIDSMaker tutorial',
    place: 'Belgium',
    year: '2026',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_louvain.pdf', label: 'Slides' }],
  },
  {
    host: "NDSS'26 PRISM Workshop",
    title: 'PIDSMaker tutorial',
    place: 'USA',
    year: '2026',
    links: [
      { href: 'https://tristanbilot.github.io/public_content/slides_pidsmaker.pdf', label: 'Slides' },
      { href: 'https://www.youtube.com/watch?v=-rYbP8cZ2uM', label: 'Video' },
    ],
  },
  {
    host: 'Télécom Paris',
    title: 'Class on AI techniques for advanced attack detection',
    place: 'France',
    year: '2026',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_telecom.pdf', label: 'Slides' }],
  },
  {
    host: 'University of Texas at El Paso',
    title: 'Achieving high quality of attribution in intrusion detection',
    place: 'USA',
    year: '2025',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_utep.pdf', label: 'Slides' }],
  },
  {
    host: 'GenAI Meetup Morocco',
    title: 'How AI protects us from cyberattacks',
    place: 'Morocco',
    year: '2025',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_genai.pdf', label: 'Slides' }],
  },
  {
    host: 'EPITA Seminar',
    title: 'Introduction to ORTHRUS and PIDSMaker',
    place: 'France',
    year: '2025',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_orthrus_epita.pdf', label: 'Slides' }],
  },
  {
    host: 'University of British Columbia',
    title: 'Inductive host detection in large temporal graphs',
    place: 'Canada',
    year: '2024',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_UBC.pdf', label: 'Slides' }],
  },
  {
    host: 'Institut Mines-Télécom',
    title: 'System-level intrusion detection with graph neural networks',
    place: 'France',
    year: '2024',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_IMT.pdf', label: 'Slides' }],
  },
  {
    host: 'DATAIA Day Saclay',
    title: 'Detecting complex attacks with graph deep learning',
    place: 'France',
    year: '2022',
    links: [{ href: 'https://tristanbilot.github.io/public_content/poster_data_ia.pdf', label: 'Poster' }],
  },
  {
    host: 'Carrefour',
    title: 'Data engineering applied to retail',
    place: 'France',
    year: '2022',
    links: [{ href: 'https://tristanbilot.github.io/public_content/slides_carrefour.pdf', label: 'Slides' }],
  },
];

const Talks = () => (
  <Section id="talks" title="Invited Talks" intro="Selected talks and tutorials I've given.">
    <ol className="talks-list animatable fadeInUp">
      {TALKS.map((talk) => (
        <li className="talk-item" key={talk.host + talk.year}>
          <div className="talk-item__main">
            <span className="talk-item__host">{talk.host}</span>
            <span className="talk-item__title">{talk.title}</span>
          </div>
          <div className="talk-item__meta">
            <span className="talk-item__place">
              {talk.place} · {talk.year}
            </span>
            {talk.links.length > 0 && (
              <span className="talk-item__links">
                {talk.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Talks;
