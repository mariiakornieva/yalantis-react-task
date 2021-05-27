import { render, screen } from '@testing-library/react';
import App from './App';

describe("Test suite", () => {
  beforeEach(() => {
    return;
  });

  test('renders Alphabet', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
