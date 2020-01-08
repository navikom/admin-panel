import { createMuiTheme } from "@material-ui/core";
import { dangerColor, infoColor, primaryColor, whiteColor } from "assets/jss/material-dashboard-react";

export default createMuiTheme({
  palette: {
    primary: { main: primaryColor[0] },
    secondary: { main: infoColor[0] },
    error: { main: dangerColor[0] }
  },
  overrides: {
    MuiButton: {
      containedSecondary: {
        color: whiteColor
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: "11px 12px"
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
