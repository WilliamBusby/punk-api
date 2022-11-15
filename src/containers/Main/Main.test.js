import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";

const testValues1 = [
  {
  name: "Test Name",
  abv: "4", 
  image_url: "test", 
  ph: "5", 
  first_brewed: "1999",
  tagline: "Test Tagline",
  id: 1,
  description: "Test Description",
  food_pairing: ["Test Food Pairing"]
  },
  {
    name: "Test Name 2",
    abv: "5", 
    image_url: "test2", 
    ph: "6", 
    first_brewed: "2000",
    tagline: "Test Tagline.",
    id: 2,
    description: "Test Description 2.",
    food_pairing: ["Test Food Pairing 2"]
  }
]

const setupRender = () => {
  return render(<MemoryRouter><Routes><Route path="/" element={<Main beers={testValues1} />}/></Routes></MemoryRouter>);
}

describe('Rendering tests', () => {

  beforeEach(() => {
    setupRender();
  })

  test('Check rendering of beer name 1', () => {

    const beerName = screen.getByText('Test Name');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('card__name')).toBe(true);
  });

  test('Check rendering of beer name 2', () => {

    const beerName = screen.getByText('Test Name 2');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('card__name')).toBe(true);
  });

  test('Check rendering of main div', () => {
    const {container} = setupRender();

    const mainElement = container.getElementsByClassName('main');

    expect(mainElement).toBeTruthy();
    expect(mainElement.length).toEqual(1);
  });

});
