import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import { PersonContext } from "../../Contexts";
import CertificationList from "./CertificationList";
import samplePeople from "../../mocks/people.json";

const samplePerson = samplePeople[0];

const renderWithPersonProvider = (providerValue) =>
  render(
    <WithProviders>
      <PersonContext.Provider value={providerValue}>
        <CertificationList />
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
    renderWithPersonProvider({ certifications: [{ id: 0 }] });
  });

  test("renders meta information for each certification item", () => {
    renderWithPersonProvider(samplePerson);
    const metaKeys = ["organization"];
    samplePerson.certifications.forEach((certificationItem) => {
      metaKeys.forEach((metaKey) => {
        let exception;
        try {
          screen.getAllByText(certificationItem[metaKey]); // allow 1+
        } catch (e) {
          exception = e;
        }
        expect(exception).toBeUndefined();
      });
    });
  });

  test("renders 'earned' date information for each certification item, if provided", () => {
    const { container } = renderWithPersonProvider(samplePerson);
    samplePerson.certifications.forEach((certificationItem) => {
      if (certificationItem.earned) {
        const elements = container.querySelectorAll(
          `time[datetime="${new Date(certificationItem.earned).valueOf()}"]`
        );
        expect(elements.length).toBeGreaterThan(0);
      }
    });
  });

  test("renders competency items", () => {
    renderWithPersonProvider(samplePerson);
    samplePerson.certifications.forEach((certificationItem) => {
      certificationItem.competencies.forEach((competency) => {
        expect(screen.getByText(competency)).toBeInTheDocument();
      });
    });
  });
});
