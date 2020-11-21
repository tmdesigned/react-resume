import { createMuiTheme } from "@material-ui/core/styles";
const theme = ({ type = "light" }) =>
  createMuiTheme({
    palette: {
      type: type
    }
  });
export default theme;
