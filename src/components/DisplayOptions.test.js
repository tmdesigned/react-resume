import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../WithProviders";
import DisplayOptions from "./DisplayOptions";
import ResumeCard from "../components/ResumeCard/ResumeCard";

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <DisplayOptions />
      </WithProviders>
    );
  });
  test("renders", () => {});
});

describe("has a working dark mode toggle", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <DisplayOptions />
      </WithProviders>
    );
  });

  test("renders a darkmode toggle", () => {
    expect(screen.getByTestId("toggle-dark")).toBeInTheDocument();
  });

  test("defaults to inactive", () => {
    const button = screen.getByTestId("toggle-dark");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("switches to active when pressed", async () => {
    const button = screen.getByTestId("toggle-dark");
    expect(button).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute("aria-pressed", "true"));
  });

  test("successfully toggles between light and dark mode", async () => {
    const lightBackgroundColor = "rgb(250, 250, 250)";
    const darkBackgroundColor = "rgb(48, 48, 48)";

    const body = document.getElementsByTagName("body")[0];
    const preStyle = window.getComputedStyle(body);
    expect(preStyle.backgroundColor).toBe(lightBackgroundColor);

    const button = screen.getByTestId("toggle-dark");
    fireEvent.click(button); // enable dark

    await waitFor(() => {
      const style = window.getComputedStyle(body);
      expect(style.backgroundColor).toBe(darkBackgroundColor);
    });

    fireEvent.click(button); // disable dark

    await waitFor(() => {
      const style = window.getComputedStyle(body);
      expect(style.backgroundColor).toBe(lightBackgroundColor);
    });
  });
});

describe("has a working 'show details' toggle", () => {
  test("renders a details toggle", () => {
    render(
      <WithProviders>
        <DisplayOptions />
      </WithProviders>
    );
    expect(screen.getByTestId("toggle-details")).toBeInTheDocument();
  });

  test("defaults to inactive", () => {
    render(
      <WithProviders>
        <DisplayOptions />
      </WithProviders>
    );
    const button = screen.getByTestId("toggle-details");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("switches to inactive when pressed", async () => {
    render(
      <WithProviders>
        <DisplayOptions />
      </WithProviders>
    );
    const button = screen.getByTestId("toggle-details");
    expect(button).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute("aria-pressed", "true"));
  });

  test("successfully toggles details", async () => {
    const sampleResumeCard = {
      bullets: ["Alpha", "Bravo"]
    };
    render(
      <WithProviders>
        <DisplayOptions />
        <ResumeCard bullets={sampleResumeCard.bullets} />
      </WithProviders>
    );

    sampleResumeCard.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument();
      expect(screen.getByText(bullet)).not.toBeVisible();
    });

    const button = screen.getByTestId("toggle-details");
    fireEvent.click(button);

    await waitFor(() => {
      sampleResumeCard.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeVisible();
      });
    });

    fireEvent.click(button);

    await waitFor(() => {
      sampleResumeCard.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeInTheDocument();
        expect(screen.getByText(bullet)).not.toBeVisible();
      });
    });
  });
});
