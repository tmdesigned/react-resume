import React from "react";
import { render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WithProviders from "../WithProviders";
import Resume from "./Resume";
import people from "../mocks/people.json";
import { server } from "../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("loads and displays output", () => {
  beforeEach(() => {
    render(
      <WithProviders>
        <Resume />
      </WithProviders>
    );
  });

  test("renders loading message until loaded", async () => {
    screen.getByText(/Loading/i);
    await waitFor( () => expect(screen.queryByText(/Loading/i)).toBeNull() );
  });

  test("renders display options", async () => {
    await screen.findByTestId("display-options");
  });

  test("renders overview", async () => {
    await screen.findByTestId("overview");
  });

  test("renders test person from mocked api (wont work on codesandbox)", async () => {
    await screen.findByText(`${people[0].firstName} ${people[0].lastName}`);
  });

  test("renders experience list", async () => {
    await screen.findByText("Experience");
  });

  test("renders education list", async () => {
    await screen.findByText("Education");
  });

  test("renders certification list", async () => {
    await screen.findByText("Certifications");
  });
});
