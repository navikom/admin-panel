/* eslint-disable */
import React from "react";
import validate from "validate.js";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import FormHelperText from "@material-ui/core/FormHelperText";

// models
import { Firebase } from "api";

// services
import { Dictionary } from "services";

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
  },
  helper: {
    textAlign: "center"
  }
};

const constraints = {
  password: {
    presence: {
      message: `^${Dictionary.value("cantBeEmpty", "Password")}`
    },
    length: {
      minimum: 6,
      message: `^${Dictionary.value("cantBeLessThan", ["Password", 6])}`
    }
  },
  email: {
    presence: {
      message: `^${Dictionary.value("cantBeEmpty", "Email")}`
    },
    email: {
      message: `^${Dictionary.value("auth/invalid-email")}`
    }
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: null,
      errorMessage: null
    };
  }

  onInput = (key, e) => {
    const errors = validate(
      Object.assign({
        email: this.state.email,
        password: this.state.password
      }, {[key]: e.target.value}), constraints) || {};
    this.setState(
      {
        [key]: e.target.value,
        errorMessage: null,
        errors
      }
    );
  };

  onSubmit = async () => {
    const {email, password} = this.state;
    try {
      const res = await Firebase.auth.signInWithEmailAndPassword(email, password)
        .catch(e => Promise.reject(e));
      this.setState({errorMessage: null});
      this.props.history.push("/");
    } catch (e) {
      console.log("error", e, email, password, Dictionary.value(e.code));
      this.setState({errorMessage: Dictionary.value(e.code)});
    }
  };

  input(key, labelText, id, icon, inputProps = {}) {
    const props = {labelText, id};
    const formControlProps = {};
    let helperText = null;
    if (this.state.errors) {
      const error = this.state.errors[key];
      props[error ? "error" : "success"] = true;
      if (error) {
        formControlProps.error = true;
        helperText = error;
      }
    } else {
      props.icon = icon;
    }

    return (
      <CustomInput
        {...props}
        formControlProps={{
          fullWidth: true,
          ...formControlProps
        }}
        inputProps={{
          onInput: e => this.onInput(key, e),
          defaultValue: this.state[key],
          ...inputProps
        }}
        helperText={helperText}
      />
    );
  }

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
                        {this.input("email", "Email", "email-address", "email")}
                      </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={10}>
                        {this.input("password", "Password", "password", "lock", {type: "password"})}
                      </GridItem>
                    </GridContainer>
                    {this.state.errorMessage && (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={10} md={10}>
                          <FormHelperText
                            error
                            className={classes.helper}>
                            {this.state.errorMessage}
                          </FormHelperText>
                        </GridItem>
                      </GridContainer>
                    )}
                  </CardBody>
                  <CardFooter justify="center" style={{justifyContent: "center"}}>
                    <Button color="primary" onClick={this.onSubmit}>Log in</Button>
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