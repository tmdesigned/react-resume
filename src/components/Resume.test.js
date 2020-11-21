import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../WithProviders";
import Resume from "./Resume";

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <Resume />
      </WithProviders>
    );
  });

  test("renders", () => {});

  test("renders display options", () => {
    expect(screen.getByTestId("display-options")).toBeInTheDocument();
  });

  test("renders overview", () => {
    expect(screen.getByTestId("overview")).toBeInTheDocument();
  });

  test("renders experience list", () => {
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  test("renders education list", () => {
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  test("renders certification list", () => {
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });
});
