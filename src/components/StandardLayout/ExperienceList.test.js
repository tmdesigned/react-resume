import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import { PersonContext } from "../../Contexts";
import ExperienceList from "./ExperienceList";

const samplePerson = {
  experience: [
    {
      id: 2,
      title: "Vice President",
      department: "Sales",
      company: "Cincinnati Prime Steak Company",
      city: "Cincinnati",
      state: "OH",
      from: "2020-04-15T04:00:00.000Z",
      responsibilities: ["Sells steaks", "Trains others to sell steaks."]
    },
    {
      id: 1,
      title: "Salesperson",
      department: "Sales",
      company: "Cincinnati Prime Steak Company",
      city: "Cincinnati",
      state: "OH",
      from: "2010-03-20T12:00:00.000Z",
      to: "2020-04-15T04:00:00.000Z",
      responsibilities: ["Tries to sell steaks.", "Samples unsold steaks."]
    }
  ]
};

const renderWithPersonProvider = (providerValue) =>
  render(
    <WithProviders>
      <PersonContext.Provider value={providerValue}>
        <ExperienceList />
      </PersonContext.Provider>
    </WithProviders>
  );

describe("loads and displays output", () => {
  test("renders", () => {
    renderWithPersonProvider(samplePerson);
  });

  test("renders with an empty provider value", () => {
    renderWithPersonProvider({});
  });

  test("renders with missing properties", () => {
    renderWithPersonProvider({ experience: [{ id: 0 }] });
  });

  test("renders meta information for each experience item", () => {
    const { getAllByText } = renderWithPersonProvider(samplePerson);
    const metaKeys = ["company", "department", "city", "state"];
    samplePerson.experience.forEach((experienceItem) => {
      metaKeys.forEach((metaKey) => {
        let exception;
        try {
          getAllByText(experienceItem[metaKey]); // allow 1+
        } catch (e) {
          exception = e;
        }
        expect(exception).toBeUndefined();
      });
    });
  });

  test("renders 'from' date information for each experience item", () => {
    const { container } = renderWithPersonProvider(samplePerson);
    samplePerson.experience.forEach((experienceItem) => {
      const elements = container.querySelectorAll(
        `time[datetime="${new Date(experienceItem.from).valueOf()}"]`
      );
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test("renders 'to' date information for each experience item, if provided", () => {
    const { container } = renderWithPersonProvider(samplePerson);
    samplePerson.experience.forEach((experienceItem) => {
      if (experienceItem.to) {
        const elements = container.querySelectorAll(
          `time[datetime="${new Date(experienceItem.from).valueOf()}"]`
        );
        expect(elements.length).toBeGreaterThan(0);
      }
    });
  });

  test("renders responsibility items", () => {
    const { getByText } = renderWithPersonProvider(samplePerson);
    samplePerson.experience.forEach((experienceItem) => {
      experienceItem.responsibilities.forEach((responsibility) => {
        expect(getByText(responsibility)).toBeInTheDocument();
      });
    });
  });
});
