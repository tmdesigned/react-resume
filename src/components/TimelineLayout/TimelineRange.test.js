import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import TimelineRange from "./TimelineRange";

const sample = {
  timelineType: "education",
  timelineTitle: "My education",
  timelineSubtitle: "Smart School, Inc.",
  timelineStart: "June 1, 2020",
  timelineEnd: "June 30, 2020",
  timelineOverlap: 0
};

const dateToYOffsetMock = jest.fn(() => 1);

describe("loads and displays output", () => {
  test("renders", () => {
    render(
      <WithProviders>
        <TimelineRange />
      </WithProviders>
    );
  });

  test("renders the title and subtitle", () => {
    render(
      <WithProviders>
        <svg>
          <TimelineRange
            timelineItem={sample}
            dateToYOffset={dateToYOffsetMock}
          />
        </svg>
      </WithProviders>
    );

    expect(screen.getByText(sample.timelineTitle)).toBeInTheDocument();
    expect(screen.getByText(sample.timelineSubtitle)).toBeInTheDocument();
  });

  test("sends its dates to the dateToYOffset prop func", () => {
    render(
      <WithProviders>
        <svg>
          <TimelineRange
            timelineItem={sample}
            dateToYOffset={dateToYOffsetMock}
          />
        </svg>
      </WithProviders>
    );

    expect(dateToYOffsetMock).toHaveBeenCalledWith(sample.timelineStart);
    expect(dateToYOffsetMock).toHaveBeenCalledWith(sample.timelineEnd);
  });

  test("adjusts the coordinates based on overlapAdjustments prop", () => {
    const { rerender } = render(
      <WithProviders>
        <svg>
          <TimelineRange
            timelineItem={sample}
            dateToYOffset={dateToYOffsetMock}
          />
        </svg>
      </WithProviders>
    );

    const sampleOverlapAdjustment = {
      y: 2,
      x: 3
    };

    const initialY = Number(
      screen.getByText(sample.timelineTitle).getAttribute("y")
    );
    const initialX = Number(
      screen.getByText(sample.timelineTitle).getAttribute("x")
    );

    rerender(
      <WithProviders>
        <svg>
          <TimelineRange
            timelineItem={sample}
            dateToYOffset={dateToYOffsetMock}
            overlapAdjustment={sampleOverlapAdjustment}
          />
        </svg>
      </WithProviders>
    );

    const postY = Number(
      screen.getByText(sample.timelineTitle).getAttribute("y")
    );
    const postX = Number(
      screen.getByText(sample.timelineTitle).getAttribute("x")
    );

    expect(postY - initialY).toEqual(sampleOverlapAdjustment.y);
    expect(postX - initialX).toEqual(sampleOverlapAdjustment.x);
  });
});
