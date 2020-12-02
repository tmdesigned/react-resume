import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../WithProviders";
import Resume from "./Resume";
import people from "../mocks/people.json"

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <Resume />
      </WithProviders>
    );
  });
 
  test("renders loading message", () => {
    screen.getByText(/Loading/i);
  });

  test("renders display options", () => {
    screen.findByTestId("display-options");
  });
 
  test("renders overview",  () => {
    screen.findByTestId("overview");
  });

  test("renders test person from mocked api",  () => {
    screen.findByText(`${people[0].firstName} ${people[0].lastName}`);
  });

  test("renders experience list", () => {
    screen.findByText("Experience");
  });

  test("renders education list", () => {
    screen.findByText("Education");
  });

  test("renders certification list", () => {
    screen.findByText("Certifications");
  });
});
