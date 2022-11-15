import { render, screen } from "@testing-library/react";
import Card from "./Card";

const testValues1 = {
  name: "Test Name",
  abv: "4", 
  image_url: "test", 
  ph: "5", 
  first_brewed: "1999",
  tagline: "Test Tagline"
}

const testValues2 = {
  name: "Test Name 2",
  abv: "5", 
  image_url: "test2", 
  ph: "6", 
  first_brewed: "2000",
  tagline: "Test Tagline."
}

const setupRender = (testParams) => {
  return render(<Card beerInfo={testParams} />)
}

describe('Rendering tests', () => {

  test('Check rendering of name 1', () => {
    setupRender(testValues1)

    const beerName = screen.getByText('Test Name');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('card__name')).toBe(true);
  });

  test('Check rendering of name 2', () => {
    setupRender(testValues2)

    const beerName = screen.getByText('Test Name 2');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('card__name')).toBe(true);
  });

  test('Check rendering of abv 1', () => {
    setupRender(testValues1)

    const beerAbv = screen.getByText('4 ABV');

    expect(beerAbv).toBeInTheDocument();
    expect(beerAbv.classList.contains('card__abv')).toBe(true);
  });

  test('Check rendering of abv 2', () => {
    setupRender(testValues2)

    const beerAbv = screen.getByText('5 ABV');

    expect(beerAbv).toBeInTheDocument();
    expect(beerAbv.classList.contains('card__abv')).toBe(true);
  });

  test('Check rendering of image via alt text 1', () => {
    setupRender(testValues1)

    const beerImage = screen.getByAltText('Image of Test Name');

    expect(beerImage).toBeInTheDocument();
    expect(beerImage.classList.contains('card__image')).toBe(true);
  });

  test('Check rendering of image via alt text 2', () => {
    setupRender(testValues2)

    const beerImage = screen.getByAltText('Image of Test Name 2');

    expect(beerImage).toBeInTheDocument();
    expect(beerImage.classList.contains('card__image')).toBe(true);
  });

  test('Check rendering of tagline 1', () => {
    setupRender(testValues1)

    const beerTagline = screen.getByText('Test Tagline.');

    expect(beerTagline).toBeInTheDocument();
    expect(beerTagline.classList.contains('card__tag-line')).toBe(true);
  });

  test('Check rendering of tagline 2', () => {
    setupRender(testValues2)

    const beerTagline = screen.getByText('Test Tagline.');

    expect(beerTagline).toBeInTheDocument();
    expect(beerTagline.classList.contains('card__tag-line')).toBe(true);
  });

  test('Check rendering of pH 1', () => {
    setupRender(testValues1)

    const beerPh = screen.getByText('5 pH');

    expect(beerPh).toBeInTheDocument();
    expect(beerPh.classList.contains('card__ph')).toBe(true);
  });

  test('Check rendering of pH 2', () => {
    setupRender(testValues2)

    const beerPh = screen.getByText('6 pH');

    expect(beerPh).toBeInTheDocument();
    expect(beerPh.classList.contains('card__ph')).toBe(true);
  });

  test('Check rendering of first brewed 1', () => {
    setupRender(testValues1)

    const beerFirstBrewed = screen.getByText('1999');

    expect(beerFirstBrewed).toBeInTheDocument();
    expect(beerFirstBrewed.classList.contains('card__first-brewed')).toBe(true);
  });

  test('Check rendering of first brewed 2', () => {
    setupRender(testValues2)

    const beerFirstBrewed = screen.getByText('2000');

    expect(beerFirstBrewed).toBeInTheDocument();
    expect(beerFirstBrewed.classList.contains('card__first-brewed')).toBe(true);
  });
});

describe('Functionality tests', () => {

  test('Check image url is correct 1', () => {
    setupRender(testValues1)

    const beerImage = screen.getByAltText('Image of Test Name');

    expect(beerImage.src).toContain("test");
  });

  test('Check image url is correct 2', () => {
    setupRender(testValues2)

    const beerImage = screen.getByAltText('Image of Test Name 2');

    expect(beerImage.src).toContain("test2");
  });
})