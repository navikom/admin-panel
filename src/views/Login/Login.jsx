/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Josefin Sans', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Login extends React.Component {

  render() {
    const {classes} = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={6} sm={6} md={4}>
            <Slide direction="down" in={true}>
              <Fade in={true}>
                <Card>
                  <CardHeader color="primary" style={{textAlign: "center"}}>
                    <h4 className={classes.cardTitleWhite}>Login</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={10}>
                        <CustomInput
                          labelText="Email"
                          id="email-address"
                          icon="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={10}>
                        <CustomInput
                          labelText="Password"
                          id="password"
                          icon="lock"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter justify="center" style={{justifyContent: "center"}}>
                    <Button color="primary">Log in</Button>
                  </CardFooter>
                </Card>
              </Fade>
            </Slide>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Login);