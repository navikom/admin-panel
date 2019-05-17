/* eslint-disable */
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//utils
import { lazy } from "../utils";

// core components
const Nav = lazy(() => import("components/Navbars/MainNav.jsx"));
const Footer = lazy(() => import("components/Footer/MainFooter.jsx"));

import routes from "routes.js";

import mainStyle from "assets/jss/material-dashboard-react/layouts/mainStyle.jsx";

import image from "assets/img/sidebar-2.jpg";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/main") {
        return (
          <Route
            path={prop.url}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      mobileOpen: false
    };
    this.wHeight = window.innerHeight;
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({mobileOpen: false});
    }
    this.wHeight = window.innerHeight;
  };

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({mobileOpen: false});
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const {classes, ...rest} = this.props;
    const backgroundImage = `url(${image})`;
    return (
      <div className={classes.wrapper}>
        <div className={classes.fullPage} style={{backgroundImage}}>
          <div className={classes.content}>
            <Suspense fallback={"Loading"}>
              <Nav routes={routes} {...rest} />
              <div className={classes.container} style={{marginTop: `${this.wHeight * .15}px`}}>{switchRoutes}</div>
              <Footer/>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainStyle)(Main);
