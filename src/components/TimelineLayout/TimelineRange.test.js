import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import TimelineRange from "./TimelineRange";

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <TimelineRange />
      </WithProviders>
    );
  });

  test("renders", () => {});
});
