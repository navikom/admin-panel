import React from "react";
import {createStyles, Switch, SwitchClassKey, SwitchProps, Theme, withStyles} from "@material-ui/core";
import {blackOpacity, primaryColor, whiteOpacity} from "assets/jss/material-dashboard-react";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
 focusVisible?: string;
}

interface Props extends SwitchProps {
 classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
   root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
   },
   switchBase: {
    padding: 1,
    '&$checked': {
     transform: 'translateX(16px)',
     color: theme.palette.common.white,
     '& + $track': {
      backgroundColor: primaryColor[0],
      opacity: 1,
      border: 'none',
     },
    },
    '&$focusVisible $thumb': {
     color: primaryColor[0],
     border: '6px solid #fff',
    },
   },
   thumb: {
    width: 24,
    height: 24,
   },
   track: {
    borderRadius: 26 / 2,
    backgroundColor: blackOpacity(.2),
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
   },
   checked: {},
   focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
 return (
   <Switch
     focusVisibleClassName={classes.focusVisible}
     disableRipple
     classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
     }}
     {...props}
   />
 );
});

export default IOSSwitch;
