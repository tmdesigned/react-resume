import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import { PersonContext } from "../../Contexts";
import Overview from "./Overview";
import samplePeople from "../../mocks/people.json";

const samplePerson = samplePeople[0];

describe("loads and displays output", () => {
  test("renders", () => {
    render(
      <WithProviders>
        <PersonContext.Provider value={samplePerson}>
          <Overview />
        </PersonContext.Provider>
      </WithProviders>
    );
  });

  test("renders with an empty provider value", () => {
    render(
      <WithProviders>
        <PersonContext.Provider value={{}}>
          <Overview />
        </PersonContext.Provider>
      </WithProviders>
    );
  });

  test("displays the first name, last name, email, and summary", () => {
    render(
      <WithProviders>
        <PersonContext.Provider value={samplePerson}>
          <Overview />
        </PersonContext.Provider>
      </WithProviders>
    );

    expect(
      screen.getByText(`${samplePerson.firstName} ${samplePerson.lastName}`)
    ).toBeInTheDocument();
    expect(screen.getByText(samplePerson.email)).toBeInTheDocument();
    expect(screen.getByText(samplePerson.summary)).toBeInTheDocument();
  });
});
