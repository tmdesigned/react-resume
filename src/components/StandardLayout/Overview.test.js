import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import { PersonContext } from "../../Contexts";
import Overview from "./Overview";

const samplePerson = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@mail.com",
  summary: "John Doe is an unidentified male."
};

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
    const { getByText } = render(
      <WithProviders>
        <PersonContext.Provider value={samplePerson}>
          <Overview />
        </PersonContext.Provider>
      </WithProviders>
    );

    expect(
      getByText(`${samplePerson.firstName} ${samplePerson.lastName}`)
    ).toBeInTheDocument();
    expect(getByText(samplePerson.email)).toBeInTheDocument();
    expect(getByText(samplePerson.summary)).toBeInTheDocument();
  });
});
