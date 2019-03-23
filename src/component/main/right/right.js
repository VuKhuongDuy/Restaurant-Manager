import React, { Component } from 'react'
import Home from './home/home'
import Employees from './employees/employees'
import Tables from './tables/tables'
import Menu from './menu/menu'
import Setting from './setting/setting'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default class Right extends Component{
    render(){
        return(
            <div>
                <div id="main-right">
                    <div className="main-right-header"></div>
                    <Route path="/setting" component={Setting}></Route>
                    <Route path="/dashboard/tables" component={Tables} />
                    <Route path="/dashboard/menu" component={Menu} />
                    <Route path="/dashboard/employees" component={Employees} />
                    <Route exact path="/dashboard/" component={Home} />
                </div>
            </div>
        )
    }
}