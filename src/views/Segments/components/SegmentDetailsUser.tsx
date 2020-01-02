import React from "react";

// @material-ui/core
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";

import SegmentViewStore from "views/Segments/SegmentViewStore";

//local components
import GeoLocationsComponent from "views/Segments/components/GeoLocationComponent";
import LastSeenComponent from "views/Segments/components/LastSeenComponent";
import VisitorTypeComponent from "views/Segments/components/VisitorTypeComponent";
import UserAttributesComponent from "views/Segments/components/UserAttributeComponent";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    marginTop: {
      marginTop: theme.spacing(2)
    },
    marginLeft: {
      marginLeft: theme.spacing(1)
    },
    textRight: {
      textAlign: "right"
    },
    center: {
      alignItems: "center"
    }
  })
);

export default () => {
  const classes = useStyles();
  const eClasses = extraStyles();

  return (
    <div className={eClasses.root}>
      <Grid container>
        <Grid item xs={6} sm={6} md={6}>
          {Dictionary.defValue(DictionaryService.keys.visitorType)}
        </Grid>
        <Grid item xs={6} sm={6} md={6} className={classes.textToRight}>
          <Button color="primary" onClick={() => SegmentViewStore.clearVisitorType()}>
            {Dictionary.defValue(DictionaryService.keys.reset)}
          </Button>
        </Grid>
      </Grid>
      <VisitorTypeComponent/>
      <Divider light className={eClasses.marginTop}/>
      <Grid container className={eClasses.marginTop}>
        <Grid item xs={6} sm={6} md={6}>
          {Dictionary.defValue(DictionaryService.keys.lastSeen)}
        </Grid>
        <Grid item xs={6} sm={6} md={6} className={classes.textToRight}>
          <Button color="primary" onClick={() => SegmentViewStore.clearLastSeen()}>
            {Dictionary.defValue(DictionaryService.keys.reset)}
          </Button>
        </Grid>
      </Grid>
      <LastSeenComponent/>
      <Divider light className={eClasses.marginTop}/>
      <Grid container className={eClasses.marginTop}>
        <Grid item xs={6} sm={6} md={6}>
          {Dictionary.defValue(DictionaryService.keys.geoLocation)}
        </Grid>
        <Grid item xs={6} sm={6} md={6} className={classes.textToRight}>
          <Button color="primary" onClick={() => SegmentViewStore.clearGeo()}>
            {Dictionary.defValue(DictionaryService.keys.reset)}
          </Button>
        </Grid>
      </Grid>
      <GeoLocationsComponent/>
      <Divider light className={eClasses.marginTop}/>
      <Grid container className={eClasses.marginTop}>
        <Grid item xs={6} sm={6} md={6}>
          {Dictionary.defValue(DictionaryService.keys.userAttributes)}
        </Grid>
        <Grid item xs={6} sm={6} md={6} className={classes.textToRight}>
          <Button color="primary" onClick={() => SegmentViewStore.clearAttributes()}>
            {Dictionary.defValue(DictionaryService.keys.reset)}
          </Button>
        </Grid>
      </Grid>
      <UserAttributesComponent/>
    </div>
  );
};
