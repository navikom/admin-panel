import { createMuiTheme } from "@material-ui/core";
import { dangerColor, primaryColor, successColor } from "assets/jss/material-dashboard-react";

export default createMuiTheme({
  palette: {
    primary: { main: primaryColor[0] },
    secondary: { main: successColor[0] },
    error: { main: dangerColor[0] }
  }
});
