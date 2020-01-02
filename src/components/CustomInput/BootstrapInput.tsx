import React from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import { primaryColor, whiteColor } from "assets/jss/material-dashboard-react";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: "relative"
  },
  label: {
    top: theme.typography.pxToRem(-10),
    left: theme.typography.pxToRem(10),
    position: "absolute",
    backgroundColor: whiteColor,
    paddingLeft: theme.typography.pxToRem(3),
    paddingRight: theme.typography.pxToRem(3),
    borderRadius: theme.typography.pxToRem(10)
  }
}));

const Input = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputBase {...props}/>
      {
        props.label && (
          <label className={classes.label}>{props.label}</label>
        )
      }
    </div>
  );
};

export default withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "\"Segoe UI\"",
        "Roboto",
        "\"Helvetica Neue\"",
        "Arial",
        "sans-serif",
        "\"Apple Color Emoji\"",
        "\"Segoe UI Emoji\"",
        "\"Segoe UI Symbol\""
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderWidth: 2,
        backgroundColor: whiteColor,
        borderColor: primaryColor[0],
      }
    }
  })
)(Input);
