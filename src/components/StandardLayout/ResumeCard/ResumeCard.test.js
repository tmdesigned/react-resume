import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResumeCard from "./ResumeCard";
import WithProviders from "../../../WithProviders";

const sample = {
  title: "My Title",
  meta: {
    myMetaItem: "My Meta Value"
  },
  from: 1577854800000,
  to: 1605695187461,
  bullets: ["Alpha", "Bravo"]
};

describe("loads and displays output with details hidden", () => {
  test("renders", () => {
    render(
      <WithProviders>
        <ResumeCard />
      </WithProviders>
    );
  });

  test("renders the title", () => {
    const { getByText } = render(
      <WithProviders>
        <ResumeCard title={sample.title} />
      </WithProviders>
    );
    expect(getByText(sample.title)).toBeInTheDocument();
  });

  test("renders the meta info", () => {
    const { getByText } = render(
      <WithProviders>
        <ResumeCard meta={sample.meta} />
      </WithProviders>
    );
    Object.keys(sample.meta).forEach((key) => {
      expect(getByText(sample.meta[key])).toBeInTheDocument();
    });
  });

  test("renders the dates", () => {
    const { container } = render(
      <WithProviders>
        <ResumeCard from={sample.from} to={sample.to} />
      </WithProviders>
    );
    const selectedElements = container.querySelectorAll("time");
    expect(selectedElements.length).toBe(2);
    expect(selectedElements[0]).toHaveAttribute(
      "datetime",
      sample.from.toString()
    );
  });

  test("hides bullets when displayOptions.showDetails is false", () => {
    const { getByText } = render(
      <WithProviders initialDisplayOptionsState={{ showDetails: false }}>
        <ResumeCard bullets={sample.bullets} />
      </WithProviders>
    );
    sample.bullets.forEach((bullet) => {
      expect(getByText(bullet)).toBeInTheDocument();
      expect(getByText(bullet)).not.toBeVisible();
    });
  });

  test("shows bullets when displayOptions.showDetails is true", () => {
    const { getByText } = render(
      <WithProviders initialDisplayOptionsState={{ showDetails: true }}>
        <ResumeCard bullets={sample.bullets} />
      </WithProviders>
    );
    sample.bullets.forEach((bullet) => {
      expect(getByText(bullet)).toBeInTheDocument();
      expect(getByText(bullet)).toBeVisible();
    });
  });
});
