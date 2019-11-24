import React from "react";

// @material-ui/core components
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// interfaces
import { IUserDevice } from "interfaces/IUserDevice";

// services
import { Dictionary } from "services/Dictionary/Dictionary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  })
);

export const UserDevicesTab = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {
        props.devices.length ?
          props.devices.map((device: IUserDevice, key: number) => (
            <ExpansionPanel key={key}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Device {key + 1}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <Typography>Created at: <b>{Dictionary.timeDateString(device.createdAt)}</b></Typography>
                  <br/>
                  <pre>
                    {JSON.stringify(device.device.info, undefined, 2)}
                  </pre>
                </div>


              </ExpansionPanelDetails>
            </ExpansionPanel>
          )) : <Typography>Cannot detect any device for that user</Typography>
      }

    </div>
  );
};
