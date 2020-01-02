import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

// @material-ui/core
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// core components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import BootstrapInput from "components/CustomInput/BootstrapInput";

import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";

// view store
import store from "views/Campaigns/CampaignViewStore";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.typography.pxToRem(20)
    },
    title: {
      opacity: .5,
      marginTop: theme.typography.pxToRem(10)
    },
    label: {
      width: theme.typography.pxToRem(200),
      marginRight: theme.typography.pxToRem(30)
    }
  }));

export default observer(() => {
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
              <BootstrapInput fullWidth/>
            </Grid>
          </Grid>
          <Grid container item direction="row" className={extraClasses.container}>
            <Typography variant="subtitle2" className={centerNote}>
              {Dictionary.defValue(DictionaryService.keys.runType)}
            </Typography>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <NativeSelect
                  id="demo-customized-select-native"
                  value={10}
                  onChange={() => {}}
                  input={<BootstrapInput />}
                >
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  );
});
