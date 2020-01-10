import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/project/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject'
import NewTest from './components/test/NewTest'
import Depression from "./components/test/Depression";
import Anxiety from "./components/test/Anxiety";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateProject} />
            <Route exact path="/test" component={NewTest} />
            <Route exact path="/test/depression" component={Depression} />
            <Route exact path="/test/anxiety" component={Anxiety} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
