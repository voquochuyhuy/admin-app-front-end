import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// import AuthLayout from "layouts/Auth.jsx";

// import AdminLayout from "layouts/Admin.jsx";
import Log from "./views/log/log"
const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/auth" component={AuthLayout} /> */}
      <Route path="/" component={Log} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
