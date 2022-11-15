import { render } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { MemoryRouter, Routes, Route } from "react-router";
import App from './App';

const setupRender = () => {
  return render(<App />)
}

describe('Rendering tests', () => {
  test('Check rendering of main div', () => {
    const {container} = setupRender();

    const mainElement = container.getElementsByClassName('main');

    expect(mainElement).toBeTruthy();
    expect(mainElement.length).toEqual(1);
  });

  test('Check rendering of nav div', () => {
    const {container} = setupRender();

    const navElement = container.getElementsByClassName('nav');

    expect(navElement).toBeTruthy();
    expect(navElement.length).toEqual(1);
  });

});