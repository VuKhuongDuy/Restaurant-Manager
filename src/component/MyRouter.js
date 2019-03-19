import React, { Component } from 'react'
import Header from './header/header'
import Left from './main/left/left'
import Right from './main/right/right'
import Main from './main/main'
import Footer from './footer/footer'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default class MyRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Main>
                        <Left />
                        <Right />
                    </Main>
                    <Footer />
                </div>
            </Router>
        )
    }
}