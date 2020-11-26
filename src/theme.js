import { createMuiTheme } from "@material-ui/core/styles";
const theme = ({ type = "light" }) =>
  createMuiTheme({
    palette: {
      type: type,
      experience: "#2196F3",
      education: "#4CAF50",
      certification: "#FF9800"
    }
  });
export default theme;
