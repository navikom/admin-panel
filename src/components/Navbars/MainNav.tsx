import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.tsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import * as Constants from "models/Constants.ts";
import { mainNavRoutes } from "routes";
import { IRoute } from "interfaces/IRoute";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/SvgIcon/SvgIcon";

function nav({ ...props }) {
  const { classes, history } = props;
  return mainNavRoutes.map((route: IRoute, i: number) => {
    return (
      <Button
        key={i}
        color="transparent"
        className={classes.link}
        onClick={() => history.push(route.path)}
      >
        {Dictionary.value(route.name)}
      </Button>
    );
  });
}

function Header({ ...props }) {
  function makeBrand() {
    let name = "Webinsolut";
    // props.routes.map((prop, key) => {
    //   if (prop.url === props.location.pathname) {
    //     name = props.rtlActive ? prop.rtlName : prop.name;
    //   }
    //   return null;
    // });
    return name;
  }

  const { classes, color, history } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button
            color="transparent"
            className={classes.title}
            onClick={() => history.push(Constants.ROOT_ROUTE)}
          >
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {nav(props)}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <div />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
