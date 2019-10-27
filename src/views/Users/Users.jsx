import React, { Suspense } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// utils
import { lazy } from "utils";

// services
import { Dictionary, DictionaryService } from "services";

// core components
const Card = lazy(() => import("components/Card/Card.jsx"));
const CardHeader = lazy(() => import("components/Card/CardHeader.jsx"));
const CardBody = lazy(() => import("components/Card/CardBody.jsx"));

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: "\"Josefin Sans\", \"Helvetica\", \"Arial\", sans-serif",
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Josefin Sans', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  codeWrapper: {
    width: "100%",
    padding: "5px",
    backgroundColor: "#f4f4f4"
  },
  media: {
    backgroundSize: "contain",
    height: "300px"
  }
};

class Users extends React.Component {

  render() {
    const {classes} = this.props;
    return (
      <Suspense fallback={"Loading"}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{Dictionary.defValue(DictionaryService.keys.users)}</h4>
            <p className={classes.cardCategoryWhite}>
              {Dictionary.defValue(DictionaryService.keys.usersDashboard)}
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.typo}>
              <h1>Users list</h1>
            </div>

          </CardBody>
        </Card>
      </Suspense>
    );
  }

}

export default withStyles(style)(Users);
