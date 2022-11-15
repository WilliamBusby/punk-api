import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Cardlist from "./Cardlist"

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

const testValues2 = []

const setupRender = (testParams) => {
  return render(<MemoryRouter><Routes><Route path="/" element={<Cardlist beers={testParams} />}/></Routes></MemoryRouter>);
}

describe('Rendering tests', () => {

  beforeEach(() => {
    setupRender(testValues1)
  })

  test('Check rendering of name 1', () => {

    const beerName = screen.getByText('Test Name');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('card__name')).toBe(true);
  });

  test('Check rendering of name 2', () => {

    const beerName = screen.getByText('Test Name 2');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('card__name')).toBe(true);
  });

});

describe('Functionality tests', () => {

  test('Check links are correct', () => {
    setupRender(testValues1)

    const beerLinkList = screen.getAllByRole('link');

    expect(beerLinkList.length).toEqual(2);
    expect(beerLinkList[0].href).toEqual("http://localhost/1");
    expect(beerLinkList[1].href).toEqual("http://localhost/2");
  });

  test('Check only div if no beers in list', () => {
    const {container} = setupRender(testValues2)
    
    const test = container.getElementsByClassName('cardlist');
    const cards = container.getElementsByClassName('full-card');
    
    expect(test.length).toEqual(1);
    expect(cards.length).toEqual(0);
  });
});