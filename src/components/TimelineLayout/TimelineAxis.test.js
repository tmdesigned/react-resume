import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithTimelineProviders from "./WithTimelineProviders";
import TimelineAxis from "./TimelineAxis";
import { defaultTimelineConfig } from "./TimelineConfigStore";

const config90s = {
  durationHeightFactor: 200000000, // ms to pixels
  topAndBottomOffset: 50,
  overlapPadding: 10,
  x: -100,
  y: 0,
  width: 600,
  height: 1000,
  duration: 0,
  start: new Date("01/01/1990"),
  end: new Date("12/31/1999")
};

describe("loads and displays output", () => {
  test("renders", () => {
    render(
      <WithTimelineProviders>
        <svg>
          <TimelineAxis />
        </svg>
      </WithTimelineProviders>
    );
  });

  test("renders only the current year when using default", () => {
    render(
      <WithTimelineProviders>
        <svg>
          <TimelineAxis />
        </svg>
      </WithTimelineProviders>
    );

    expect(
      screen.getByText(new Date().getFullYear().toString())
    ).toBeInTheDocument();

    expect(screen.queryByText(/[0-9]{4}/)).toBeInTheDocument();
  });

  test("renders the 90s", () => {
    render(
      <WithTimelineProviders initialTimelineConfig={config90s}>
        <svg>
          <TimelineAxis />
        </svg>
      </WithTimelineProviders>
    );

    expect(screen.getByText("1990")).toBeInTheDocument();

    expect(screen.getByText("1999")).toBeInTheDocument();

    expect(screen.queryAllByText(/[0-9]{4}/).length).toBe(10);
  });

  test("includes a line of configured height", () => {
    render(
      <WithTimelineProviders>
        <svg>
          <TimelineAxis />
        </svg>
      </WithTimelineProviders>
    );

    //height is height - 2 * topAndBottomOffset
    expect(
      Number(screen.getByTestId("timeline-axis-line").getAttribute("y2")) -
        Number(screen.getByTestId("timeline-axis-line").getAttribute("y1"))
    ).toEqual(
      defaultTimelineConfig.height -
        2 * defaultTimelineConfig.topAndBottomOffset
    );
  });
});
