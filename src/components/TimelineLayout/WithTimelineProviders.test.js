import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithTimelineProviders from "./WithTimelineProviders";
import {
  TimelineConfigContext,
  DispatchTimelineConfigContext
} from "../../Contexts";

const sampleConfig = {
  durationHeightFactor: 200000000, // ms to pixels
  topAndBottomOffset: 0,
  height: 1000,
  duration: 1000,
  start: new Date(0),
  end: new Date(1000)
};

const sampleDates = {
  dateStart: new Date(0),
  dateQuarter: new Date(250),
  dateMid: new Date(500),
  date3Quarters: new Date(750),
  dateEnd: new Date(1000)
};

describe("loads and displays output", () => {
  test("renders", () => {
    render(<WithTimelineProviders />);
  });

  test("exposes TimelineConfigContext", () => {
    render(
      <WithTimelineProviders>
        <TimelineConfigContext.Consumer>
          {(value) => (value ? "true" : "false")}
        </TimelineConfigContext.Consumer>
      </WithTimelineProviders>
    );

    expect(screen.getByText("true")).toBeInTheDocument();
  });

  test("exposes DispatchTimelineConfigContext", () => {
    render(
      <WithTimelineProviders>
        <DispatchTimelineConfigContext.Consumer>
          {(value) => (value ? "true" : "false")}
        </DispatchTimelineConfigContext.Consumer>
      </WithTimelineProviders>
    );

    expect(screen.getByText("true")).toBeInTheDocument();
  });

  test("updates TimelineConfigContext when DispatchTimelineConfigContext dispatches a new value", async () => {
    render(
      <WithTimelineProviders initialTimelineConfig={sampleConfig}>
        <TimelineConfigContext.Consumer>
          {(timelineConfig) => (
            <DispatchTimelineConfigContext.Consumer>
              {(dispatch) => (
                <>
                  <button
                    data-testid="dispatch"
                    onClick={() => {
                      dispatch({ type: "height", value: "50" });
                    }}
                  >
                    dispatch
                  </button>
                  <span data-testid="value">{timelineConfig.height}</span>
                </>
              )}
            </DispatchTimelineConfigContext.Consumer>
          )}
        </TimelineConfigContext.Consumer>
      </WithTimelineProviders>
    );

    expect(screen.getByTestId("value")).toHaveTextContent(sampleConfig.height);
    try {
      fireEvent.click(screen.getByTestId("dispatch"));
    } catch (e) {}
    await waitFor(() => {
      expect(screen.getByTestId("value")).toHaveTextContent("50");
    });
  });
});

describe("dateToYOffset", () => {
  test("exists on TimelineConfigcontext", () => {
    render(
      <WithTimelineProviders>
        <TimelineConfigContext.Consumer>
          {(value) => (value.dateToYOffset ? "true" : "false")}
        </TimelineConfigContext.Consumer>
      </WithTimelineProviders>
    );

    expect(screen.getByText("true")).toBeInTheDocument();
  });

  test("provides appropriate values", () => {
    render(
      <WithTimelineProviders initialTimelineConfig={sampleConfig}>
        <TimelineConfigContext.Consumer>
          {(value) => (
            <>
              <span data-testid="start">
                {value.dateToYOffset(sampleDates.dateStart)}
              </span>
              <span data-testid="quarter">
                {value.dateToYOffset(sampleDates.dateQuarter)}
              </span>
              <span data-testid="mid">
                {value.dateToYOffset(sampleDates.dateMid)}
              </span>
              <span data-testid="three">
                {value.dateToYOffset(sampleDates.date3Quarters)}
              </span>
              <span data-testid="end">
                {value.dateToYOffset(sampleDates.dateEnd)}
              </span>
            </>
          )}
        </TimelineConfigContext.Consumer>
      </WithTimelineProviders>
    );

    expect(screen.getByTestId("start")).toHaveTextContent("1000");
    expect(screen.getByTestId("quarter")).toHaveTextContent("750");
    expect(screen.getByTestId("mid")).toHaveTextContent("500");
    expect(screen.getByTestId("three")).toHaveTextContent("250");
    expect(screen.getByTestId("end")).toHaveTextContent("0");
  });

  test("returns 0 if no duration", () => {
    render(
      <WithTimelineProviders
        initialTimelineConfig={{
          ...sampleConfig,
          duration: 0
        }}
      >
        <TimelineConfigContext.Consumer>
          {(value) => (
            <>
              <span data-testid="start">
                {value.dateToYOffset(sampleDates.dateStart)}
              </span>
            </>
          )}
        </TimelineConfigContext.Consumer>
      </WithTimelineProviders>
    );

    expect(screen.getByTestId("start")).toHaveTextContent("0");
  });
});
