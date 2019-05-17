import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import Button from "components/CustomButtons/Button.jsx";
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";

const style = {
  wrapper: {
    width: "500px"
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
  },
  success: buttonStyle.success
};

function ProgressButton({...props}) {
  const {loading, classes, text, ...rest} = props;
  const btnClasses = classNames({
    [classes.success]: !loading,
    wrapper: true
  });
  return (
      <Button
        disabled={loading}
        className={btnClasses}
        {...rest}
      >
        {text}
        {loading && <CircularProgress size={32} className={classes.progress} />}
      </Button>
  )

}

export default withStyles(style)(ProgressButton);
