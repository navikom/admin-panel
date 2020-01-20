import React from "react";
import CardBody from "components/Card/CardBody";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";
import Card from "components/Card/Card";
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";
import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      width: theme.typography.pxToRem(200),
      marginRight: theme.typography.pxToRem(30)
    }
  }));

const TestStep = () => {

  const store = CampaignViewStore.testStepStore;
  if (!store) return null;

  const classes = useStyles();
  const extraClasses = extraStyles();
  const centerNote = classNames(classes.note, classes.center, classes.textToRight, extraClasses.label);
  return (
    <Card>
      <CardBody>
        <Grid container>
          <Grid container item direction="row">
            <Typography variant="subtitle2" className={centerNote}>
              {Dictionary.defValue(DictionaryService.keys.name)}
            </Typography>
            <Grid item xs={12} sm={12} md={6}>
            </Grid>
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default observer(TestStep);
