import React, { useState } from "react";
import classNames from "classnames";

// @material-ui/core components
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import Box from "@material-ui/core/Box";

// @material-ui/icons
import { Lens } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// services
import { IEvent } from "interfaces/IEvent";
import ProgressButton from "components/CustomButtons/ProgressButton";
import { Dictionary } from "services/Dictionary/Dictionary";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GridContainer from "components/Grid/GridContainer";
import Avatar from "@material-ui/core/Avatar";
import GridItem from "components/Grid/GridItem";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react-lite";
import { IUserEvents } from "interfaces/IUserEvents";
import { observable } from "mobx";

const useInfoStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.typography.pxToRem(20)
    },
    label: {
      opacity: .4,
      fontWeight: 600
    },
    wrapper: {
      position: "relative",
      paddingLeft: theme.spacing(4),
      marginTop: theme.typography.pxToRem(20)
    },
    nested: {
      "&:after": {
        content: "''",
        position: "absolute",
        left: "15px",
        top: "-5px",
        height: "15px",
        width: "1px",
        borderLeft: "1px dashed #ccc"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        top: "10px",
        left: "15px",
        width: "15px",
        height: "1px",
        borderBottom: "1px dashed #ccc"
      }
    }
  })
);

const SubInfoItems = ({ ...props }) => {
  const classes = useInfoStyles();
  return (
    <Grid container className={classes.wrapper}>
      <Grid container className={classes.nested} direction="row">
        <Grid item className={classes.label}>{props.title}:&nbsp;</Grid>
        <Grid item>{props.data}</Grid>
      </Grid>
    </Grid>

  );
};

const InfoItem = ({ ...props }) => {
  const classes = useInfoStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12}>
        <Chip label={props.title}/>
      </Grid>
      {props.data.map((prop: [string, string], key: number) => <SubInfoItems key={key} title={prop[0]}
                                                                             data={prop[1]}/>)}
    </Grid>
  );
};

const EventInfo = ({ ...props }) => {
  return (
    <Grid container>
      <InfoItem title="Device" data={props.data.device.planeData}/>
      <InfoItem title="Region" data={props.data.region.planeData}/>
      {props.data.app && <InfoItem title="App" data={props.data.app.planeData}/>}
      {
        props.data.data &&
        <InfoItem
          title="Custom"
          data={Object.keys(props.data.data).map((k) => [k, JSON.stringify(props.data.data[k])])}/>
      }
    </Grid>
  );
};

const ExpansionPanel = withStyles({
  root: {
    boxShadow: "none",
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    leftSpace: {
      minWidth: theme.typography.pxToRem(150)
    },
    date: {
      fontWeight: 600,
      opacity: 0.3
    },
    titleContent: {
      marginLeft: theme.typography.pxToRem(15),
      fontWeight: 600
    },
    icon: {
      color: "#efefef"
    },
    overflow: {
      overflow: "hidden"
    },
    flex: {
      boxSizing: "border-box"
    },
    content: {
      paddingLeft: theme.typography.pxToRem(20),
      marginLeft: theme.typography.pxToRem(20)
    },
    line: {
      position: "absolute",
      borderLeft: "1px solid #efefef",
      top: theme.typography.pxToRem(25),
      left: "11.58rem",
      height: "95%"
    }
  })
);

export const UserEventsTab = observer((props: {events: IUserEvents}) => {
  const classes = useStyles();

  const isMobile = window.outerWidth < 1000;

  const leftSpace = classNames({
    [classes.leftSpace]: !isMobile,
    [classes.date]: true
  });

  const leftContentSpace = classNames({
    [classes.leftSpace]: !isMobile
  });

  const content = classNames({
    [classes.content]: !isMobile
  });

  const onClick = () => {
    props.events.tryGetNext();
  };

  return (
    <div className={classes.root}>
      {
        props.events.items.map((event: IEvent, key: number) => (
          <ExpansionPanel square key={key} className={classes.overflow}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex">
                <Box className={leftSpace}>{Dictionary.timeDateString(event.createdAt)}</Box>
                <Box className={classes.icon}><Lens/></Box>
                <Box className={classes.titleContent}>{event.title}</Box>
              </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box className={leftContentSpace}/>
              <Box className={content}>
                <EventInfo data={event.info}/>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      }
      {!isMobile && <div className={classes.line}/>}
      <ProgressButton onClick={onClick} loading={props.events.fetching} text="Loading more"/>
    </div>
  );
});
