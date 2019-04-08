import React from "react";
import shell from "shelljs";
// @material-ui/core components
import {
  CardMedia
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Image1 from "assets/img/guide/1.png";
import Image2 from "assets/img/guide/2.png";
import Image3 from "assets/img/guide/3.png";
import Image4 from "assets/img/guide/4.png";
import Image5 from "assets/img/guide/5.png";
import Image6 from "assets/img/guide/6.png";
import Image7 from "assets/img/guide/7.png";
import Image8 from "assets/img/guide/8.png";
import Image9 from "assets/img/guide/9.png";
import Image10 from "assets/img/guide/10.png";
import Image11 from "assets/img/guide/11.png";
import Image12 from "assets/img/guide/12.png";
import Image13 from "assets/img/guide/13.png";
import Image14 from "assets/img/guide/14.png";
import Image15 from "assets/img/guide/15.png";
import Image16 from "assets/img/guide/16.png";
import Image17 from "assets/img/guide/17.png";
import Image18 from "assets/img/guide/18.png";
import Image19 from "assets/img/guide/19.png";
import Image20 from "assets/img/guide/20.png";

// services
import { Dictionary } from "services";

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

class Guide extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  onBuild() {
    console.log(shell);
  }

  render() {
    const {classes} = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{Dictionary.value("guide1")}</h4>
          <p className={classes.cardCategoryWhite}>
            {Dictionary.value("guide2")}
          </p>
        </CardHeader>
        <CardBody>
          <div className={classes.typo}>
            <h1>{Dictionary.value("guide3")}</h1>
          </div>
          <div className={classes.typo}>
            <a href="#step1">
              <div className={classes.note}>{Dictionary.value("step", 1)}</div>
              <h3>{Dictionary.value("guide1_2")}.</h3>
            </a>
          </div>
          <div className={classes.typo}>
            <a href="#step2">
              <div className={classes.note}>{Dictionary.value("step", 2)}</div>
              <h3>{Dictionary.value("guide4")}.</h3>
            </a>
          </div>
          <div className={classes.typo}>
            <a href="#step3">
              <div className={classes.note}>{Dictionary.value("step", 3)}</div>
              <h3>{Dictionary.value("guide5")}.</h3>
            </a>
          </div>
          <div className={classes.typo}>
            <a href="#step4">
              <div className={classes.note}>{Dictionary.value("step", 4)}</div>
              <h3>{Dictionary.value("guide6")}.</h3>
            </a>
          </div>
          <div className={classes.typo} id="step1">
            <h2>{Dictionary.value("guide1_2")}</h2>
          </div>
          <h4>{Dictionary.value("guide17", "Admin Panel")} <a target="_blank" rel="noopener noreferrer"
                                               href="https://www.jetbrains.com/webstorm/">WebStorm</a> {Dictionary.value("guide18")}
          </h4>
          <h4>{Dictionary.value("guide19")}:</h4>
          <div className={classes.codeWrapper}>
            <code>npm install</code>
          </div>
          <h4>{Dictionary.value("guide1_3")}:</h4>
          <div className={classes.codeWrapper}>
            <code>npm start</code>
          </div>
          <h4>{Dictionary.value("guide1_4")} <a target="_blank" rel="noopener noreferrer"
                                                href="http://localhost:3000/">http://localhost:3000</a> {Dictionary.value("guide1_5")}.</h4>
          <div className={classes.typo} id="step2">
            <h2>{Dictionary.value("guide4")}</h2>
          </div>
          <h4>{Dictionary.value("guide7")}
            <a href="https://console.firebase.google.com" target="_blank"
               rel="noopener noreferrer"> https://console.firebase.google.com</a> {Dictionary.value("guide8")}
          </h4>
          {
            [[Image1], [Image2], [Image3], [Image4], [Image5], [Image6], [Image7], [Image8], [Image9],
              [Image10, <h4>{Dictionary.value("openFirebaseConfig")}</h4>],
              [Image11], [Image12],
              [Image13, <h4>{Dictionary.value("insertFBCredentials")} <code>admin-panel/src/config/Firebase.js</code></h4>],
              [Image14, <h4>{Dictionary.value("createDatabase")}</h4>], [Image15], [Image16], [Image17], [Image18]]
              .map((entry, i) => (
                <div key={i}>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={8} md={8}>
                      <CardMedia
                        className={classes.media}
                        image={entry[0]}
                      />
                    </GridItem>
                  </GridContainer>
                  {entry[1] ? entry[1] : <br/>}
                </div>
              ))
          }
          <h4>{Dictionary.value("guide23")}</h4>
          <Button color="primary" onClick={this.onBuild}>{Dictionary.value("Build")}</Button>
          <div className={classes.typo} id="step3">
            <h2>{Dictionary.value("guide5")}</h2>
          </div>
          {
            ["guide9", "guide10", "guide11", "guide12"].map((e, i) => <h4 key={i}>{Dictionary.value(e)}</h4>)
          }
          <ul>
            <li>
              <h4><b>IOS</b> {Dictionary.value("guide13")}</h4>
            </li>
            <li>
              <h4><b>ANDROID</b> {Dictionary.value("guide14")} <a target="_blank" rel="noopener noreferrer"
                                                                  href="https://facebook.github.io/react-native/docs/getting-started.html">{Dictionary.value("guide15")}</a>)
              </h4>
            </li>
          </ul>
          <h4>{Dictionary.value("guide16")}:</h4>
          <div className={classes.codeWrapper}>
            <code>npm install -g react-native-cli</code>
          </div>
          <div className={classes.typo} id="step4">
            <h2>{Dictionary.value("guide6")}</h2>
          </div>
          <h4>{Dictionary.value("guide17", "React-native app")} <a target="_blank" rel="noopener noreferrer"
                                               href="https://www.jetbrains.com/webstorm/">WebStorm</a> {Dictionary.value("guide18")}
          </h4>
          <h4>{Dictionary.value("guide19")}:</h4>
          <div className={classes.codeWrapper}>
            <code>npm install</code>
          </div>
          <h4>{Dictionary.value("guide20")}:</h4>
          <div className={classes.codeWrapper}>
            <code>react-native run-ios</code>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8}>
              <CardMedia
                className={classes.media}
                image={Image19}
              />
            </GridItem>
          </GridContainer>
          <br/>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8}>
              <CardMedia
                className={classes.media}
                image={Image20}
              />
            </GridItem>
          </GridContainer>
          <h4>{Dictionary.value("guide21")}:</h4>
          <div className={classes.codeWrapper}>
            <code>react-native run-android</code>
          </div>
          <h4>{Dictionary.value("guide22")}</h4>
        </CardBody>
      </Card>
    );
  }

}

export default withStyles(style)(Guide);