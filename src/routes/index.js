// react library
import React from "react";

// third party library
import { Switch, Route, Router } from "react-router-dom";
import history from "../history";

// components
import Home from "../components/Home";
import ListUsers from "../components/Users/Users";
import CreateUsers from "../components/Users/CreateUsers"
import EditUsers from "../components/Users/EditUsers";
import ViewTasks from "../components/Tasks/UserTasks";
import CreateTask from "../components/Tasks/CreateTask";
import EditTask from "../components/Tasks/EditTask";

/**
 * @desc handles routing
 * @returns {object} routes
 */
const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={ListUsers} />
      <Route exact path="/user/create" component={CreateUsers} />
      <Route exact path="/user/edit/:id/:name" component={EditUsers} />
      <Route exact path="/tasks/:userId" component={ViewTasks} />
      <Route exact path="/task/create" component={CreateTask} />
      <Route exact path="/task/edit/:userId/:taskId" component={EditTask} />
      <Route component={Home} />
    </Switch>
  </Router>
);
export default Routes;
