import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import WithTimelineProviders from "./WithTimelineProviders";
import { PersonContext } from "../../Contexts";
import TimelineItems from "./TimelineItems";
import samplePeople from "../../mocks/people.json";
import { defaultTimelineConfig } from "./TimelineConfigStore";

const samplePerson = samplePeople[0];

const renderWithProvider = (personValue = samplePerson, timelineConfigValue = defaultTimelineConfig) =>
  render(
    <WithProviders>
      <WithTimelineProviders value={timelineConfigValue}>
        <PersonContext.Provider value={personValue}>
          <svg>
          <TimelineItems />
          </svg>
        </PersonContext.Provider>
      </WithTimelineProviders>
    </WithProviders>
  );


  describe("loads and displays output", () => {
    test("renders", () => {
      renderWithProvider();
    });

    test("renders person's history", () => {
      renderWithProvider();

      expect(screen.getByText(samplePerson.experience[0].title)).toBeInTheDocument();
      expect(screen.getByText(samplePerson.certifications[0].title)).toBeInTheDocument();
      expect(screen.getByText(samplePerson.education[0].institution)).toBeInTheDocument();

      
    })
  });


