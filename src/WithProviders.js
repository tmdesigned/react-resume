import React, { useReducer } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import {
  DisplayOptionsContext,
  DispatchDisplayOptionContext
} from "./Contexts";
import {
  displayOptionsReducer,
  defaultDisplayOptionsState
} from "./DisplayOptionsStore";
import theme from "./theme";

const WithProviders = ({
  initialDisplayOptionsState = defaultDisplayOptionsState,
  children
}) => {
  const [displayOptionsState, dispatchDisplayOptionsAction] = useReducer(
    displayOptionsReducer,
    initialDisplayOptionsState
  );

  const adjustedTheme = theme({
    type: displayOptionsState.dark ? "dark" : "light"
  });

  return (
    <DisplayOptionsContext.Provider value={displayOptionsState}>
      <DispatchDisplayOptionContext.Provider
        value={dispatchDisplayOptionsAction}
      >
        <ThemeProvider theme={adjustedTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </DispatchDisplayOptionContext.Provider>
    </DisplayOptionsContext.Provider>
  );
};

export default WithProviders;
