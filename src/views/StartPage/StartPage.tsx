import React from "react";
import { RouteComponentProps } from "react-router";
// @material-ui/core components
import { WithStyles } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "assets/jss/material-dashboard-react/views/singlePageStyle.tsx";

interface StartPageProps extends RouteComponentProps, WithStyles<typeof styles> {
}
class StartPage extends React.Component<StartPageProps> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={6} sm={6} md={4}>
            <Slide direction="down" in={true}>
              <Fade in={true}>
                <h1 className={`${classes.cardTitleWhite} ${classes.titleWhite}`}>Admin Panel</h1>
              </Fade>
            </Slide>
          </GridItem>
        </GridContainer>
      </div>);
  }
}

export default withStyles(styles)(StartPage);
