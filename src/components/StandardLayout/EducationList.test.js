import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import { PersonContext } from "../../Contexts";
import EducationList from "./EducationList";
import { escapeRegExp } from "../../util/helpers";
import samplePeople from "../../mocks/people.json";

const samplePerson = samplePeople[0];

const renderWithPersonProvider = (providerValue) =>
  render(
    <WithProviders>
      <PersonContext.Provider value={providerValue}>
        <EducationList />
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
    renderWithPersonProvider({ education: [{ id: 0 }] });
  });

  test("renders meta information for each education item", () => {
    renderWithPersonProvider(samplePerson);
    const metaKeys = [
      "degreeDescription",
      "degree",
      "institution",
      "city",
      "state"
    ];
    samplePerson.education.forEach((educationItem) => {
      metaKeys.forEach((metaKey) => {
        let exception;
        try {
          screen.getAllByText(educationItem[metaKey]); // allow 1+
        } catch (e) {
          exception = e;
        }
        expect(exception).toBeUndefined();
      });
    });
  });

  test("renders date information for each education item", () => {
    const { container } = renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      const selectedElements = container.querySelectorAll(
        `time[datetime="${new Date(educationItem.earned).valueOf()}"]`
      );
      expect(selectedElements.length).toBeGreaterThan(0);
    });
  });

  test("renders composite degree phrase", () => {
    renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      const regEx = new RegExp(
        escapeRegExp(
          `${educationItem.degreeDescription} in ${educationItem.department}`
        )
      );
      expect(screen.getByText(regEx)).toBeInTheDocument();
    });
  });

  test("does not render degree phrase if no degree info", () => {
    renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      screen.getByText(/Degree.*in/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("renders primary focus area phrase", () => {
    renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      expect(
        screen.getByText(`Primary focus: ${educationItem.primaryArea}`)
      ).toBeInTheDocument();
    });
  });

  test("does not render 'Primary focus' if none given", () => {
    renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      screen.getByText(/Primary focus/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("renders secondary focus area phrase", () => {
    renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      expect(
        screen.getByText(`Secondary focus: ${educationItem.secondaryArea}`)
      ).toBeInTheDocument();
    });
  });

  test("does not render 'Secondary focus' if none given", () => {
    renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      screen.getByText(/Secondary focus/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("renders distinction phrase", () => {
    renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      expect(
        screen.getByText(`Graduated ${educationItem.distinction}`)
      ).toBeInTheDocument();
    });
  });

  test("does not render 'Graduated' if no distinction given", () => {
    renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      screen.getByText(/Graduated/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });
});
