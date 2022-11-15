import { fireEvent, render, screen } from "@testing-library/react";
import RangeSlider from "./RangeSlider";

const testValues1 = {
  name: "testName", 
  min: 0, 
  max: 10, 
  step: 1, 
  value: 0, 
  label: "Test Name"
}

const changeSearchParams = jest.fn();

const testValues2 = {
  name: "testName2", 
  min: 1, 
  max: 11, 
  step: 2, 
  value: 1, 
  label: "Test Name2"
}

const setupRender = (testParams) => {
  return render(<RangeSlider           
    name={testParams.name} 
    min={testParams.min} 
    max={testParams.max} 
    step={testParams.step} 
    changeSearchParams={changeSearchParams} 
    value={testParams.value} 
    label={testParams.label}  
  />)
}

describe('Rendering tests', () => {

  test('Check rendering of label 1', () => {
    setupRender(testValues1)

    const label = screen.getByLabelText('Test Name 0');

    expect(label).toBeInTheDocument();
    expect(label.parentElement.classList.contains('nav__range')).toBe(true);
  });

  test('Check rendering of label 2', () => {
    setupRender(testValues2)

    const label = screen.getByLabelText('Test Name2 1');

    expect(label).toBeInTheDocument();
    expect(label.parentElement.classList.contains('nav__range')).toBe(true);
  });

  test('Check rendering of range 1', () => {
    const {container} = setupRender(testValues1)

    const range = container.querySelector('input[name="testName"]');

    expect(range).toBeInTheDocument();
    expect(range.parentElement.classList.contains('nav__range')).toBe(true);

  });

  test('Check rendering of range 2', () => {
    const {container} = setupRender(testValues2)

    const range = container.querySelector('input[name="testName2"]');

    expect(range).toBeInTheDocument();
    expect(range.parentElement.classList.contains('nav__range')).toBe(true);

  });

});

describe('Functionality tests', () => {

  test('Check default value 1', () => {
    setupRender(testValues1);

    const range = screen.getByRole('slider');

    expect(range.value).toEqual("0");
  });

  test('Check default value 2', () => {
    setupRender(testValues2);

    const range = screen.getByRole('slider');

    expect(range.value).toEqual("1");
  });

  test('Check default min 1', () => {
    setupRender(testValues1);

    const range = screen.getByRole('slider');

    expect(range.min).toEqual("0");
  });

  test('Check default min 2', () => {
    setupRender(testValues2);

    const range = screen.getByRole('slider');

    expect(range.min).toEqual("1");
  });

  test('Check default max 1', () => {
    setupRender(testValues1);

    const range = screen.getByRole('slider');

    expect(range.max).toEqual("10");
  });

  test('Check default max 2', () => {
    setupRender(testValues2);

    const range = screen.getByRole('slider');

    expect(range.max).toEqual("11");
  });

  test('Check function calls 1', () => {
    const {container} = setupRender(testValues1)

    const range = container.querySelector('input[name="testName"]');

    fireEvent.change(range, {target: {value: 10}});

    expect(changeSearchParams).toHaveBeenCalled();

  });

  test('Check function calls 2', () => {
    const {container} = setupRender(testValues2)

    const range = container.querySelector('input[name="testName2"]');

    fireEvent.change(range, {target: {value: 5}});

    expect(changeSearchParams).toHaveBeenCalled();

  });
});