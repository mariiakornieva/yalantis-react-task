import { render, screen } from '@testing-library/react';
import App from './App';
import { StateProvider } from './context/StateContext';
import { ALPHABET } from './constants';
import { fetchEmployees } from './api';

describe("Test suite", () => {
  const mockFetchEmployees = (fetchEmployees = jest.fn());

  beforeEach(() => {
    render(
      <StateProvider>
        <App />
      </StateProvider>
    );
  });

  test("renders titles", () => {
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Employees Birthday')).toBeInTheDocument();
  });

  test('renders alphabet', () => {
    ALPHABET.split('').forEach(letter => {
      expect(screen.getByText((content, element) => {
        return element.tagName === 'H3' && content === letter;
      })).toBeInTheDocument();
    })
  });


});
