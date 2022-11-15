import { fireEvent, render, screen } from "@testing-library/react";
import SearchBox from "./SearchBox";

const changeSearchParams = jest.fn();

const setupRender = () => {
  return render(<SearchBox changeSearchParams={changeSearchParams} />);
}

describe('Rendering tests', () => {

  beforeEach(() => {
    setupRender();
  })

  test('Check rendering of input box', () => {
    
    const input = screen.getByPlaceholderText("Search...");

    expect(input).toBeInTheDocument();
    expect(input.parentElement.classList.contains('search-box')).toBe(true);
  });

});

describe('Functionality tests', () => {

  beforeEach(() => {
    setupRender();
  })

  test('Check function calls', () => {

    const input = screen.getByPlaceholderText("Search...");

    fireEvent.input(input, {target: {value: 10}});

    expect(changeSearchParams).toHaveBeenCalled();

  });
});