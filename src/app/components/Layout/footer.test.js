import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { advanceTo } from "jest-date-mock";

import Footer from "./Footer";

// beforeAll(() => {
//   global.Date = jest.fn(() => ({
//     getFullYear: jest.fn(() => "2019")
//   }));
// });

describe("UI Footer", () => {
  beforeAll(() => {
    advanceTo(new Date("2020-01-01"));
  });

  it('has text "© Copyright by Arnas Austinskas | 2020"', () => {
    const { getByText } = render(<Footer />);

    expect(
      getByText("© Copyright by Arnas Austinskas | 2020")
    ).toBeInTheDocument();
  });
});
