import React from "react";
import { Box } from "@material-ui/core";
import WithProviders from "./WithProviders";
import Resume from "./components/Resume";

const App = () => {
  return (
    <WithProviders>
      <Box>
        <Resume />
      </Box>
    </WithProviders>
  );
};

export default App;
