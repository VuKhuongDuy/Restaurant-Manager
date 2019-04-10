import React, { Component } from 'react';
import './App.css';
import Authentica from './component/login/login'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Authentica/>
        </Router>
      </div>
    );
  }
}

export default App;
