import React, { Component } from 'react';
import Tables from './main/right/tables/tables'
import TablesAddFood from './main/right/tables/tablesAddFood.js'
import TablesPayment from './main/right/tables/tablesPayment.js'
import Header from './header/header'
import Left from "./main/left/left"
import Setting from "./main/right/setting/setting"
import Menu from "./main/right/menu/menu"
import Employees from "./main/right/employees/employees"
import History from './main/right/history/history.js'
import Footer from './footer/footer';
import Home from './main/right/home/home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class MyRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div>
                        <Left />
                        <div id="main-right" style={{ position: "relative" }}>
                            <div className="main-right-header"></div>
                            <Switch>
                                <Route path="/dashboard/setting" component={Setting} />
                                <Switch>
                                    <Route path="/dashboard/tables/addfood/:id" component={TablesAddFood} />
                                    <Route path="/dashboard/tables/payment" component={TablesPayment} />
                                    <Route exact path="/dashboard/tables/" component={Tables} />
                                </Switch>
                                <Route path="/dashboard/menu" component={Menu} />
                                <Route path="/dashboard/employees" component={Employees} />
                                <Route path="/dashboard/history" component={History} />
                                <Route exact path="/dashboard" component={Home} />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default MyRouter;