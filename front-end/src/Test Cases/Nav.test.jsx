import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../components/Nav";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Nav Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when user is logged in", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Add Product")).toBeInTheDocument();
    expect(screen.getByText("Update Product")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout (Test User)")).toBeInTheDocument();
  });

  it("renders correctly when user is not logged in", () => {
    localStorage.removeItem("user");
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("logs out user when Logout link is clicked", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Logout (Test User)"));
    expect(localStorage.getItem("user")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});
