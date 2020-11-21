import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardMetaList from "./CardMetaList";

const items = { alphaKey: "alphaValue", bravoKey: "bravoValue" };

describe("loads and displays output", () => {
  test("renders", () => {
    render(<CardMetaList items={items} />);
  });

  test("renders nothing when no items argument is present", () => {
    const { container } = render(<CardMetaList />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders nothing when items argument is empty", () => {
    const { container } = render(<CardMetaList items={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders each list item", () => {
    render(<CardMetaList items={items} />);
    Object.keys(items).forEach((itemKey) => {
      expect(screen.getByText(items[itemKey])).toBeInTheDocument();
    });
  });
});
