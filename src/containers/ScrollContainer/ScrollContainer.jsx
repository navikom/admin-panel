import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  drawerWidth,
  transition
} from "assets/jss/material-dashboard-react.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import Icon from "@material-ui/core/Icon";
import RootRef from "@material-ui/core/RootRef";
import PerfectScrollbar from "../../layouts/Admin";

const styles = theme => ({
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    scrollBehavior: "smooth"
  },
  rtl: {
    float: "left"
  },
  toTop: {
    position: "fixed",
    bottom: "10px",
    opacity: .8
  },
  right: {
    right: "10px"
  },
  left: {
    left: "10px"
  }
});

class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      showedTop: false
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      new PerfectScrollbar(this.container.current);
    }
    this.container.current.onscroll = this.onScroll;
  }

  componentWillUnmount() {
    this.container.current.removeEventListener("onscroll", this.onScroll);
  }

  onScroll = (e) => {
    if (this.container.current.scrollTop > 400 && !this.state.showedTop) {
      this.setState({showedTop: true});
    } else if (this.container.current.scrollTop <= 400 && this.state.showedTop) {
      this.setState({showedTop: false});
    }
  };

  toTop = () => {
    const node = this.container.current;
    node.scrollTop = 0;
  };

  render() {
    const {classes, rtl, children} = this.props;
    const {showedTop} = this.state;
    return (
      <RootRef rootRef={this.container}>
        <div className={classNames(classes.mainPanel, {[classes.rtl]: rtl})}>
          {children}
          {
            showedTop && (
              <Button
                className={classNames(classes.toTop, {[classes.right]: !rtl, [classes.left]: rtl})}
                variant="contained"
                onClick={this.toTop}>
                <Icon>keyboard_arrow_up</Icon>
              </Button>
            )
          }
        </div>
      </RootRef>
    );
  }
}

ScrollContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollContainer);
