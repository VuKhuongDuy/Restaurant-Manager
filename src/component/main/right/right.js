import React, { Component } from 'react'
import Home from './home/home'
// import TablesAddFood from './tablesAddFood'
// import TablesPayment from './tablesPayment'
import Tables from './tables/tables'
import Menu from './menu/menu'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default class Right extends Component{
    render(){
        return(
            <div id="main-right">
                <div className = "main-right-header"></div>
                <Route exact path="/" component={Home}/>
                <Route path="/tables" component={Tables}/>
                <Route path="/menu" component={Menu} />
            </div>
        )
            // < Route path = "/payment" component = { TablesPayment } />
            //     <Route path="/addfood" component={TablesAddFood} />
    }
}