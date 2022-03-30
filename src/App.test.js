import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from './App';
import CardList from "./containers/Cardlist/Cardlist";
import BeerPage from "./components/BeerPage/BeerPage";
import Navbar from "./containers/Navbar/Navbar";

test('Renders page header', () => {
  render(<App />);

  const headingText = screen.getByText(/punk/i);

  expect(headingText).toBeInTheDocument();
});

test('Renders nav properly', () => {
  render(<App />);

})