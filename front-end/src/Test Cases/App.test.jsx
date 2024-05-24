import React from "react"; // Add this import
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

jest.mock("../components/Nav", () => () => <div>Nav Component</div>);
jest.mock("../components/Footer", () => () => <div>Footer Component</div>);
jest.mock("../components/SignUp", () => () => <div>SignUp Component</div>);
jest.mock("../components/Login", () => () => <div>Login Component</div>);
jest.mock("../components/PrivateComponent", () => ({ children }) => (
  <div>Private Component {children}</div>
));

describe("App component", () => {
  test("renders Nav and Footer components", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Nav Component")).toBeInTheDocument();
    expect(screen.getByText("Footer Component")).toBeInTheDocument();
  });

  test("renders SignUp component on /signup route", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("SignUp Component")).toBeInTheDocument();
  });

  test("renders Login component on /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Login Component")).toBeInTheDocument();
  });

  test("renders private components on protected routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Private Component")).toBeInTheDocument();
    expect(screen.getByText("Product Component")).toBeInTheDocument();
  });
});
