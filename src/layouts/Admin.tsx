/* eslint-disable */
import React, { Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// utils
import { lazy } from "utils";

// core components
const Navbar = lazy(() => import("components/Navbars/Navbar.jsx"));
const Footer = lazy(() => import("components/Footer/Footer.jsx"));
const Sidebar = lazy(() => import("components/Sidebar/Sidebar.jsx"));

// core containers
import ScrollContainer from "containers/ScrollContainer/ScrollContainer";

import routes from "routes";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { IRoute } from "interfaces/IRoute";
import WaitingComponent from "hocs/WaitingComponent";

const switchRoutes = (
  <Switch>
    {routes.map((prop: IRoute, key: number) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
            path={prop.layout + (prop.path || prop.url) + (prop.params ? prop.params : "")}
            component={WaitingComponent(prop.component)}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

interface DashboardProps extends RouteComponentProps, WithStyles<typeof dashboardStyle> {
}

type DashboardState = {
  image: any,
  color: String,
  hasImage: boolean,
  fixedClasses: string,
  mobileOpen: boolean
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown",
      mobileOpen: false
    };
  }

  handleImageClick = (image: any) => {
    this.setState({ image: image });
  };
  handleColorClick = (color: String) => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);

  }

  componentDidUpdate(e: RouteComponentProps) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
          <Sidebar
            routes={routes}
            logoText={"WebInSolut"}
            logo={logo}
            image={this.state.image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color={this.state.color}
            {...rest}
          />
          <ScrollContainer>
              <Navbar
                routes={routes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
              />
              {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
              {this.getRoute() ? (
                <div className={classes.content}>
                  <div className={classes.container}>{switchRoutes}</div>
                </div>
              ) : (
                <div className={classes.map}>{switchRoutes}</div>
              )}
              {this.getRoute() ? <Footer/> : null}
              {/*<FixedPlugin*/}
              {/*  handleImageClick={this.handleImageClick}*/}
              {/*  handleColorClick={this.handleColorClick}*/}
              {/*  bgColor={this.state["color"]}*/}
              {/*  bgImage={this.state["image"]}*/}
              {/*  handleFixedClick={this.handleFixedClick}*/}
              {/*  fixedClasses={this.state.fixedClasses}*/}
              {/*/>*/}
          </ScrollContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
