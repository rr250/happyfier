import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/project/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject'
import YourPosts from './components/project/YourPosts'
import Chat from './components/chat/Chat';
  
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
            <Route path="/yourposts" component={YourPosts} />
          </Switch>
          <Chat />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;