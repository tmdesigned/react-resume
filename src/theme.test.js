import "@testing-library/jest-dom/extend-expect";
import theme from "./theme";

describe("it generates a mui theme", () => {
  test("returns a material ui theme", () => {
    const myTheme = theme();
    expect(myTheme).toMatchObject({
      breakpoints: {},
      direction: expect.stringContaining(""),
      mixins: {},
      overrides: {},
      palette: {},
      props: {},
      shadows: expect.arrayContaining([]),
      typography: {},
      shape: {},
      transitions: {},
      zIndex: {}
    });
  });

  test("accepts an optional 'type' param", () => {
    const myTheme = theme({ type: "dark" });
    expect(myTheme.palette.type).toEqual("dark");
    const myLightTheme = theme({ type: "light" });
    expect(myLightTheme.palette.type).toEqual("light");
  });
});
