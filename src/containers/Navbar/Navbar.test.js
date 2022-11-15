import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "./Navbar"

const testValues1 = {
  currentParams: {
    beer_name: "test",
    abv_gt: 0,
    brewed_before: "2022",
    usePh: false
  },
  currentPage: 1
}

const testValues2 = {
  currentParams: {
    beer_name: "test2",
    abv_gt: 1,
    brewed_before: "2023",
    usePh: true
  },
  currentPage: 2
}

const changeSearchParams = jest.fn();
const handlePageClick = jest.fn();

const setupRender = (testParams) => {
  return render(<Navbar changeSearchParams={changeSearchParams} currentSearchParams={testParams.currentParams} handlePageClick={handlePageClick} currentPage={testParams.currentPage} /> )
}

describe('Rendering tests', () => {

  beforeEach(() => {setupRender(testValues1)});

  test('Check renders h1 name', () => {

    const logo1 = screen.getByText("PUNK")
    const logo2 = screen.getByText("API")
    
    expect(logo1).toBeInTheDocument();
    expect(logo2).toBeInTheDocument();
    expect(logo1.classList.contains("nav__punk")).toBe(true);
  });

  test('Check renders search box', () => {

    const searchBox = screen.getByPlaceholderText("Search...")

    expect(searchBox).toBeInTheDocument();
    expect(searchBox.id).toEqual("search-box");
  });

  test('Check renders 2 slider components', () => {

    const sliderArr = screen.getAllByRole('slider')

    expect(sliderArr).toHaveLength(2);
  });

  test('Check renders checkbox component', () => {

    const checkbox = screen.getAllByRole('checkbox');

    expect(checkbox).toHaveLength(1);
    expect(checkbox[0]).toBeInTheDocument();
  });
});

describe('Functionality tests', () => {

  beforeEach(() => {setupRender(testValues2);})

  test('Check search params functions works', () => {
    
    const slider1 = screen.getAllByRole('slider')[0];
    fireEvent.change(slider1, {target: {value: 5}});

    expect(changeSearchParams).toHaveBeenCalledTimes(1);
  });

  test('Check handle page click functions works', () => {

    const button1 = screen.getAllByRole('button').filter(button => button.innerHTML==="2")[0];
    fireEvent.click(button1);

    expect(handlePageClick).toHaveBeenCalledTimes(1);
  });
});