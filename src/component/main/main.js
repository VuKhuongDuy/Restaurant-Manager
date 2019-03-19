import React, {Component} from 'react'
import Left from './left/left'
import Right from './right/right'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default class Main extends Component{
    render(){
        return(
            <Router>
                <div id="main">
                    <Left></Left>
                    <Right></Right>
                </div>
            </Router>
        )
    }
}