import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// api

// models
import { App } from "models/App";
import * as Constants from "models/Constants.tsx";

// core components
import Admin from "layouts/Admin";
import RTL from "layouts/RTL.jsx";
import Main from "layouts/Main.tsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

App.setHistory(hist);
App.start();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path={Constants.ADMIN_ROUTE} component={Admin}/>
      <Route path="/rtl" component={RTL}/>
      <Route path={Constants.LOGIN_ROUTE} component={Main}/>
      <Route path={Constants.START_PAGE_ROUTE} component={Main}/>
      <Redirect from={Constants.ROOT_ROUTE} to={Constants.START_PAGE_ROUTE}/>
      <Route path="*" component={Admin}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
