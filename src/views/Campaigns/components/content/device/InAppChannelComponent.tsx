import React from "react";
import {SMSChannelComponentType} from "types/commonTypes";
import {MobileVariantType} from "interfaces/IVariant";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   root: {
    position: "absolute",
    top: theme.spacing(5),
    padding: theme.spacing(2)
   },
   container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
   },

  }));


function Content(props: {variant: MobileVariantType}) {
 const classes = useStyles();
 return (
   <Grid container className={classes.root} justify="center">
    <Grid container className={classes.container}>
     <Grid container>
     </Grid>
    </Grid>
   </Grid>
 )
}

function InAppChannelsComponent(props: SMSChannelComponentType) {
 const {ios, ...rest} = props;
 return <Content {...rest} />;
}

export default InAppChannelsComponent;
