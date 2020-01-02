import { createMuiTheme } from "@material-ui/core";
import { dangerColor, primaryColor, successColor, whiteColor } from "assets/jss/material-dashboard-react";

export default createMuiTheme({
  palette: {
    primary: { main: primaryColor[0] },
    secondary: { main: successColor[0] },
    error: { main: dangerColor[0] }
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: "11px 12px",
      }
    },
    MuiBadge: {
      badge: {
        border: "1px solid " + whiteColor
      },
      anchorOriginTopRightRectangle: {
        transform: "scale(1) translate(48%, -48%)"
      }
    }
  }
});
