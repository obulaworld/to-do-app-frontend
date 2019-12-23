// react library
import React from "react";

// third party library
import { Switch, Route, Router } from "react-router-dom";
import history from "../history";

// components
import Home from "../components/Home";

/**
 * @desc handles routing
 * @returns {object} routes
 */
const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  </Router>
);
export default Routes;
