import React, { Component } from 'react';
import './App.css';
import MyRouter from './component/MyRouter'
import Login from './component/login/login'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login}></Route>
            <Route path="/dashboard" component={MyRouter}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
