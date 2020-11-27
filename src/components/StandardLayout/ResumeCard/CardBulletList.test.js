import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardBulletList from "./CardBulletList";

const items = ["alpha", "bravo"];

describe("loads and displays output", () => {
  test("renders", () => {
    render(<CardBulletList bullets={items} />);
  });

  test("renders nothing when no bullets argument is present", () => {
    const { container } = render(<CardBulletList />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders nothing when bullets argument is empty", () => {
    const { container } = render(<CardBulletList bullets={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders each bullet", () => {
    const { getByText } = render(<CardBulletList bullets={items} />);
    items.forEach((item) => {
      expect(getByText(item)).toBeInTheDocument();
    });
  });
});
