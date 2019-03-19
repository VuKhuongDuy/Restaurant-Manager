import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/header/header'
import Main from './component/main/main'
import Footer from './component/footer/footer'
import MyRouter from './component/MyRouter'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyRouter/>
      </div>
    );
  }
}

export default App;
