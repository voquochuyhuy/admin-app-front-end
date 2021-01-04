import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import Auth from "./layout/auth.js";
import Admin from "./layout/admin.js";
const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Admin} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
