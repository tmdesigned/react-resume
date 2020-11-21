import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DateRange from "./DateRange";

const sampleDates = {
  januarySimple: "2020-01-05T05:00:00.000Z",
  januaryUnix: 1578200400000,
  januaryDefaultFormat: "1/5/2020",
  januaryAltFormat: "5/1/20",
  marchSimple: "2020-03-01T05:00:00.000Z",
  marchUnix: 1583038800000,
  marchDefaultFormat: "3/1/2020",
  marchAltFormat: "1/3/20"
};

const altFormat = "D/M/YY";

describe("loads and displays output", () => {
  test("renders", () => {
    render(<DateRange />);
  });

  test("renders empty string if no dates given", () => {
    const { container } = render(<DateRange />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders empty string if no from date given", () => {
    const { container } = render(<DateRange to={sampleDates.januarySimple} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders empty string if from date is blank", () => {
    const { container } = render(<DateRange from="" />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders a date range if both dates given", () => {
    render(
      <DateRange
        from={sampleDates.januarySimple}
        to={sampleDates.marchSimple}
      />
    );
    expect(
      screen.getByText(sampleDates.januaryDefaultFormat)
    ).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(
      screen.getByText(sampleDates.marchDefaultFormat)
    ).toBeInTheDocument();
  });

  test("presents dates as 'time' elements", () => {
    const { container } = render(
      <DateRange
        from={sampleDates.januarySimple}
        to={sampleDates.marchSimple}
      />
    );
    const selectedElements = container.querySelectorAll("time");
    expect(selectedElements.length).toBe(2);
    expect(selectedElements[0]).toHaveAttribute(
      "datetime",
      sampleDates.januaryUnix.toString()
    );
  });

  test("renders '- present' if only from date given", () => {
    render(<DateRange from={sampleDates.januarySimple} />);
    expect(
      screen.getByText(sampleDates.januaryDefaultFormat)
    ).toBeInTheDocument();
    expect(screen.getByText(/-/)).toBeInTheDocument();
    expect(screen.getByText(/Present/)).toBeInTheDocument();
  });

  test("renders a single date only if both dates match exactly", () => {
    render(
      <DateRange
        from={sampleDates.januarySimple}
        to={sampleDates.januarySimple}
      />
    );
    expect(
      screen.getByText(sampleDates.januaryDefaultFormat)
    ).toBeInTheDocument();
    let exception;
    try {
      screen.getByText(/-/);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });

  test("accepts epoch time in MS as inputs", () => {
    render(
      <DateRange from={sampleDates.januaryUnix} to={sampleDates.marchUnix} />
    );
    expect(
      screen.getByText(sampleDates.januaryDefaultFormat)
    ).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(
      screen.getByText(sampleDates.marchDefaultFormat)
    ).toBeInTheDocument();
  });

  test("accepts alternate output date formats", () => {
    render(
      <DateRange
        from={sampleDates.januaryUnix}
        to={sampleDates.marchUnix}
        format={altFormat}
      />
    );
    expect(screen.getByText(sampleDates.januaryAltFormat)).toBeInTheDocument();
    expect(screen.getByText(sampleDates.marchAltFormat)).toBeInTheDocument();
    let exception;
    try {
      screen.getByText(sampleDates.januaryDefaultFormat);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
  });
});
