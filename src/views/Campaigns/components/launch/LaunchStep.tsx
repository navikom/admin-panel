import React from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

// @material-ui/core
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

// services
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";

// assets
import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";
import cardStyles from "assets/jss/material-dashboard-react/views/cardStyle";

// core components
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";

// view store
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    container: {
      marginTop: theme.typography.pxToRem(20)
    },
    label: {
      width: theme.typography.pxToRem(200),
      marginRight: theme.typography.pxToRem(30)
    }
  }));

const LaunchStep = () => {
  const store = CampaignViewStore.launchStepStore;
  if (!store) return null;
  const classes = useStyles();
  const cardClasses = cardStyles();
  const extraClasses = extraStyles();
  const centerNote = classNames(classes.note, classes.center, classes.textToRight, extraClasses.label);

  return (
    <div className={extraClasses.root}>
      <Card>
        <CardHeader color="inherit" plain>
          <h4 className={cardClasses.cardTitleBlack}>
            {Dictionary.defValue(DictionaryService.keys.from).toUpperCase()}
          </h4>
        </CardHeader>
        <CardBody>
          <Grid container>
            <Grid container item direction="row" className={extraClasses.container}>
              <Typography variant="subtitle2" className={centerNote}>
                {Dictionary.defValue(DictionaryService.keys.name)}
              </Typography>
              <Grid item xs={12} sm={12} md={6}>
              </Grid>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
    </div>
  )
};

export default observer(LaunchStep);
