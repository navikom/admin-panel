import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// api
import { Firebase } from "api/Firebase/Firebase";

// models
import { User } from "models";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import Main from "layouts/Main.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

Firebase.init();

Firebase.auth.onAuthStateChanged(user => {
  console.log("user", user);
  User.setAuthorized(user !== null);
}, error => {
  console.log("error", error);
});

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin}/>
      <Route path="/rtl" component={RTL}/>
      <Route path="/login" component={Main}/>
      <Redirect from="/" to="/admin/guide"/>
      <Route path="*" component={Admin}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
