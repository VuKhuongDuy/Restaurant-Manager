import React, { Component } from 'react';
import './App.css';
import MyRoute from './component/login/login'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <MyRoute />
      </Router>
    );
  }
}

export default App;
