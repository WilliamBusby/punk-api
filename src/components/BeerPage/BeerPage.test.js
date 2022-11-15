import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import BeerPage from "./BeerPage";

const testValues1 = {
  name: "Test Name",
  abv: "4", 
  image_url: "test", 
  ph: "5", 
  first_brewed: "1999",
  tagline: "Test Tagline",
  id: 1,
  description: "Test Description",
  food_pairing: ["Test Food Pairing"]
}

const testValues2 = {
  name: "Test Name 2",
  abv: "5", 
  image_url: "test2", 
  ph: "6", 
  first_brewed: "2000",
  tagline: "Test Tagline.",
  id: 1,
  description: "Test Description 2.",
  food_pairing: ["Test Food Pairing 2"]
}

const testValues3 = {
  id: 2
}

const setupRender = (testParams) => {
  return render(<MemoryRouter initialEntries={["/1"]}>
    <Routes>
      <Route path='/:beerId' element={<BeerPage beers={[testParams]} />}>
      </Route>
    </Routes>
  </MemoryRouter>)
}

describe('Rendering tests', () => {

  test('Check rendering of logo', () => {
    setupRender(testValues3);
    
    const logo1 = screen.getByText("PUNK")
    const logo2 = screen.getByText("API")
    
    expect(logo1).toBeInTheDocument();
    expect(logo2).toBeInTheDocument();
    expect(logo1.classList.contains("beer-page__punk")).toBe(true);
  })

  test('Check rendering of name 1', () => {
    setupRender(testValues1)

    const beerName = screen.getByText('Test Name');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('beer-page__name')).toBe(true);
  });

  test('Check rendering of name 2', () => {
    setupRender(testValues2)

    const beerName = screen.getByText('Test Name 2');

    expect(beerName).toBeInTheDocument();
    expect(beerName.classList.contains('beer-page__name')).toBe(true);
  });

  test('Check rendering of tagline 1', () => {
    setupRender(testValues1)

    const beerTagline = screen.getByText('"Test Tagline."');

    expect(beerTagline).toBeInTheDocument();
    expect(beerTagline.parentElement.classList.contains('beer-page__tagline')).toBe(true);
  });

  test('Check rendering of tagline 2', () => {
    setupRender(testValues2)

    const beerTagline = screen.getByText('"Test Tagline."');

    expect(beerTagline).toBeInTheDocument();
    expect(beerTagline.parentElement.classList.contains('beer-page__tagline')).toBe(true);
  });

  test('Check rendering of abv 1', () => {
    setupRender(testValues1)

    const beerAbv = screen.getByText('ABV % = 4');

    expect(beerAbv).toBeInTheDocument();
    expect(beerAbv.classList.contains('beer-page__abv')).toBe(true);
  });

  test('Check rendering of abv 2', () => {
    setupRender(testValues2)

    const beerAbv = screen.getByText('ABV % = 5');

    expect(beerAbv).toBeInTheDocument();
    expect(beerAbv.classList.contains('beer-page__abv')).toBe(true);
  });

  test('Check rendering of first brewed 1', () => {
    setupRender(testValues1)

    const beerFirstBrewed = screen.getByText('First brewed in 1999');

    expect(beerFirstBrewed).toBeInTheDocument();
    expect(beerFirstBrewed.classList.contains('beer-page__first-brewed')).toBe(true);
  });

  test('Check rendering of first brewed 2', () => {
    setupRender(testValues2)

    const beerFirstBrewed = screen.getByText('First brewed in 2000');

    expect(beerFirstBrewed).toBeInTheDocument();
    expect(beerFirstBrewed.classList.contains('beer-page__first-brewed')).toBe(true);
  });

  test('Check rendering of description 1', () => {
    setupRender(testValues1)

    const beerDesc = screen.getByText('"Test Description."');

    expect(beerDesc).toBeInTheDocument();
    expect(beerDesc.classList.contains('beer-page__description')).toBe(true);
  });

  test('Check rendering of description 2', () => {
    setupRender(testValues2)

    const beerDesc = screen.getByText('"Test Description 2."');

    expect(beerDesc).toBeInTheDocument();
    expect(beerDesc.classList.contains('beer-page__description')).toBe(true);
  });

  test('Check rendering of food pairings 1', () => {
    setupRender(testValues1)

    const beerFoodPairing = screen.getByText('Test Food Pairing');

    expect(beerFoodPairing).toBeInTheDocument();
    expect(beerFoodPairing.parentElement.classList.contains('beer-page__food-pairing')).toBe(true);
  });

  test('Check rendering of food pairings 2', () => {
    setupRender(testValues2)

    const beerFoodPairing = screen.getByText('Test Food Pairing 2');

    expect(beerFoodPairing).toBeInTheDocument();
    expect(beerFoodPairing.parentElement.classList.contains('beer-page__food-pairing')).toBe(true);
  });

  test('Check rendering of image via alt text 1', () => {
    setupRender(testValues1)

    const beerImage = screen.getByAltText('Image of Test Name');

    expect(beerImage).toBeInTheDocument();
    expect(beerImage.parentElement.classList.contains('beer-page__image')).toBe(true);
  });

  test('Check rendering of image via alt text 2', () => {
    setupRender(testValues2)

    const beerImage = screen.getByAltText('Image of Test Name 2');

    expect(beerImage).toBeInTheDocument();
    expect(beerImage.parentElement.classList.contains('beer-page__image')).toBe(true);
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

  test('Check 404 page for wrong index', () => {
    setupRender(testValues3);

    const notFoundText = screen.getByText('404 Beer Not Found');

    expect(notFoundText).toBeInTheDocument();
  });

  test('Check link for logo correct', () => {
    setupRender(testValues3);

    const logo2 = screen.getByText("API");

    expect(logo2.parentElement.href).toBe("http://localhost/")
  });

  test('Check description cut off at 400 chars', () => {
    const testValues4 = {...testValues2, description: `${testValues2.description.repeat(50)}`}
    setupRender(testValues4);

    const beerDesc = screen.getByText(`"Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2. Test Description 2."`);

    expect(beerDesc).toBeInTheDocument();
  })
});