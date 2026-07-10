import { render, screen, fireEvent } from '@testing-library/react';
import Publications from './Publications';

const countCards = () => document.querySelectorAll('.publication-card').length;

test('shows only selected publications until the toggle is expanded', () => {
  render(<Publications />);

  expect(countCards()).toBe(5);
  expect(screen.queryByText(/PhishGNN: A Phishing Website/)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /show all 8 publications/i }));

  expect(countCards()).toBe(8);
  expect(screen.getByText(/PhishGNN: A Phishing Website/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /show fewer publications/i }));
  expect(countCards()).toBe(5);
});

test('marks Tristan Bilot as the highlighted author and flags joint first authorship', () => {
  render(<Publications />);

  const orthrus = screen.getByText(/ORTHRUS: Achieving High Quality/).closest('.publication-card');
  expect(orthrus).toHaveTextContent('Joint first author');
  expect(orthrus.querySelector('u')).toHaveTextContent('Tristan Bilot');
});
