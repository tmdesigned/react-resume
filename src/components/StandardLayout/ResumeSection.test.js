import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResumeSection from "./ResumeSection";
import WithProviders from "../../WithProviders";

const sample = {
  title: "My Resume Section"
};

const sampleContent = "some content";

describe("loads and displays output with details hidden", () => {
  test("renders", () => {
    render(
      <WithProviders>
        <ResumeSection />
      </WithProviders>
    );
  });

  test("renders the title", () => {
    render(
      <WithProviders>
        <ResumeSection title={sample.title} />
      </WithProviders>
    );
    expect(screen.getByText(sample.title)).toBeInTheDocument();
  });
});

describe("hides and shows details", () => {
  test("hides details by default when displayOptions.showDetails is false", () => {
    render(
      <WithProviders initialDisplayOptionsState={{ showDetails: false }}>
        <ResumeSection>{sampleContent}</ResumeSection>
      </WithProviders>
    );
    const accordion = screen.getByRole("button");
    expect(accordion).toHaveAttribute("aria-expanded", "false");
  });

  test("shows details by default when displayOptions.showDetails is false", () => {
    render(
      <WithProviders initialDisplayOptionsState={{ showDetails: true }}>
        <ResumeSection>{sampleContent}</ResumeSection>
      </WithProviders>
    );
    const accordion = screen.getByRole("button");
    expect(accordion).toHaveAttribute("aria-expanded", "true");
  });

  test("toggles showing details when clicking title", async () => {
    render(
      <WithProviders initialDisplayOptionsState={{ showDetails: false }}>
        <ResumeSection>{sampleContent}</ResumeSection>
      </WithProviders>
    );
    const accordion = screen.getByRole("button");
    expect(accordion).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(accordion);
    await waitFor(() =>
      expect(accordion).toHaveAttribute("aria-expanded", "true")
    );
    fireEvent.click(accordion);
    await waitFor(() =>
      expect(accordion).toHaveAttribute("aria-expanded", "false")
    );
  });
});
