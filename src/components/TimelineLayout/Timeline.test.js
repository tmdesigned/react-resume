import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../../WithProviders";
import Timeline from "./Timeline";

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <Timeline />
      </WithProviders>
    );
  });

  test("renders", () => {});
});
