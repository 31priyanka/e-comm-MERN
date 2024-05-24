import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  test("renders the footer with correct text", () => {
    const { getByText } = render(<Footer />);
    const headingElement = getByText(/E-comm Dashboard/i);
    expect(headingElement).toBeInTheDocument();
  });
});
