import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Tables from '../left/left'
export default class Left extends Component {
    constructor(props) {
        super(props);
        this.x = new Date().toLocaleString();
    }

    render() {
        return (
            <div id="main-left">
                <div className="main-left-header">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <div id="left-header-date">{this.x}</div>
                </div>
                <div className="main-left-body">

                    <li id="left-home" className="left-link">
                        <NavLink to="/">
                            <div id="left-body-home" className="left-selecter">
                                <i className="fa fa-home" aria-hidden="true" style={{ width: 'auto', height: '100%', marginRight: '5px' }} />Home
                                </div>
                            <div className="decor-btn"></div>
                        </NavLink>
                    </li>
                    <li id="left-tables" className="left-link">
                        <NavLink to="/tables">
                            <div id="left-body-tables" className="left-selecter">
                                <i className="fa fa-table" aria-hidden="true" style={{ width: 'auto', height: '100%', marginRight: '5px' }} />
                                Danh sách bàn
                                </div>
                            <div className="decor-btn"></div>
                        </NavLink>
                    </li>
                    <li id="left-menu" className="left-link">
                        <NavLink to="/menu">
                            <div id="left-body-menu" className="left-selecter">
                                <i className="fa fa-cutlery" aria-hidden="true" style={{ width: 'auto', height: '100%', marginRight: '5px' }} />
                                Thực đơn
                                </div>
                            <div className="decor-btn"></div>
                        </NavLink>
                    </li>
                    <li id="left-employees" className="left-link">
                        <NavLink to="/employees">
                            <div id="left-body-employees" className="left-selecter">
                                <i className="fa fa-users" aria-hidden="true" style={{ width: 'auto', height: '100%', marginRight: '5px' }} />
                                Nhân viên
                                </div>
                            <div className="decor-btn"></div>
                        </NavLink>
                    </li>
                </div>
                <div className="main-left-footer">
                </div>
            </div>
        )
    }
}