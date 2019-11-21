import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import RTLNavbarLinks from "./RTLNavbarLinks.jsx";
import Button from "components/CustomButtons/Button.tsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle";

function Header({ ...props }) {
  function makeBrand() {
    let name = "Page didn't find.";

    props.routes.map((prop, key) => {
      if (props.location.pathname.includes(prop.layout + prop.url) || props.location.pathname.includes(prop.layout + prop.path)) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
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

          <Button color="transparent" href="#" className={classes.adminTitle}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks history={history}/> : <AdminNavbarLinks history={history}/>}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
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
