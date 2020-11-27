import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import { PersonContext } from "../../Contexts";
import EducationList from "./EducationList";
import { escapeRegExp } from "../../util/helpers";

const samplePerson = {
  education: [
    {
      id: 2,
      degree: "D.D.S.",
      degreeDescription: "Doctor of Dental Science",
      department: "Medicine",
      primaryArea: "Teeth",
      secondaryArea: "Gums",
      institution: "Ohio Dental Academy",
      city: "Amelia",
      state: "OH",
      earned: "2020-05-15T16:00:00.000Z",
      distinction: "Cum Laude"
    },
    {
      id: 1,
      degree: "B.S.",
      degreeDescription: "Bachelor of Science",
      department: "Biology",
      primaryArea: "Pre-Medicine",
      secondaryArea: "Dental Sales",
      institution: "University of Cincinnati",
      city: "Cincinnati",
      state: "OH",
      earned: "2016-05-15T16:00:00.000Z",
      distinction: "Summa Cum Laude"
    }
  ]
};

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
    const { getAllByText } = renderWithPersonProvider(samplePerson);
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
          getAllByText(educationItem[metaKey]); // allow 1+
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
    const { getByText } = renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      const regEx = new RegExp(
        escapeRegExp(
          `${educationItem.degreeDescription} in ${educationItem.department}`
        )
      );
      expect(getByText(regEx)).toBeInTheDocument();
    });
  });

  test("does not render degree phrase if no degree info", () => {
    const { getByText } = renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      getByText(/Degree.*in/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("renders primary focus area phrase", () => {
    const { getByText } = renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      expect(
        getByText(`Primary focus: ${educationItem.primaryArea}`)
      ).toBeInTheDocument();
    });
  });

  test("does not render 'Primary focus' if none given", () => {
    const { getByText } = renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      getByText(/Primary focus/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("renders secondary focus area phrase", () => {
    const { getByText } = renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      expect(
        getByText(`Secondary focus: ${educationItem.secondaryArea}`)
      ).toBeInTheDocument();
    });
  });

  test("does not render 'Secondary focus' if none given", () => {
    const { getByText } = renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      getByText(/Secondary focus/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("renders distinction phrase", () => {
    const { getByText } = renderWithPersonProvider(samplePerson);
    samplePerson.education.forEach((educationItem) => {
      expect(
        getByText(`Graduated ${educationItem.distinction}`)
      ).toBeInTheDocument();
    });
  });

  test("does not render 'Graduated' if no distinction given", () => {
    const { getByText } = renderWithPersonProvider({ education: [{ id: 0 }] });
    let exception;
    try {
      getByText(/Graduated/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });
});
