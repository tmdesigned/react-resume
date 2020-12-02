import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import WithTimelineProviders from "./WithTimelineProviders";
import Timeline from "./Timeline";
import { PersonContext } from "../../Contexts";
import samplePeople from "../../mocks/people.json";

const samplePerson = samplePeople[0];

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <PersonContext.Provider value={samplePerson}>
          <WithTimelineProviders>
            <Timeline />
          </WithTimelineProviders>
        </PersonContext.Provider>
      </WithProviders>
    );
  });

  test("renders", () => {});
});
