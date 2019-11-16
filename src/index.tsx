import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// models
import { App } from "models/App.ts";
import * as Constants from "models/Constants.ts";

import "assets/css/material-dashboard-react.css?v=1.6.0";

// core components
import Admin from "layouts/Admin";
import Main from "layouts/Main.tsx";

const hist = createBrowserHistory();

App.setHistory(hist);
App.start();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path={Constants.ADMIN_ROUTE} component={Admin}/>
      <Route path={Constants.LOGIN_ROUTE} component={Main}/>
      <Route path={Constants.SIGN_UP_ROUTE} component={Main}/>
      <Route path={Constants.ROOT_ROUTE} component={Main}/>
      <Redirect to={Constants.START_PAGE_ROUTE}/>
      <Route path="*" component={Admin}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
