import React, { Component } from 'react'
import App from '../../App'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setting: "false"
        }
    }

    clickSetting() {
        let formSetting = this.refs.form_setting;
        if (this.state.setting == "false") {
            formSetting.style.display = "block";
            this.state.setting = "true";
        } else if (this.state.setting == "true") {
            formSetting.style.display = "none";
            this.state.setting = "false";
        }
    }
    
    clickLogOut(){
        App.haveToLogin = 'true'
    }

    render() {
        console.log(App.haveToLogin)
        return (
            <div className="header">
                <div className="header-logo">
                    <img src="../../../img/logo.png" alt="logo" />
                </div>
                <div className="header-title">
                    <div>Royal Restaurant</div>
                </div>
                <div className="header-user">
                    <div id="header-user-name">{this.props.user}</div>
                    <div id="header-user-setting">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        <i className="fa fa-caret-down btn-setting" ref="btn-setting" onClick={this.clickSetting.bind(this)}></i>
                        <div id="form-setting" ref="form_setting">
                            <li ref="setting" className="li li-setting">
                                <NavLink to="/dashboard/setting">Đổi mật khẩu</NavLink>
                            </li>
                            <li ref="logout" className="li li-logout">
                                <a href="http://localhost:3000/" onClick={this.clickLogOut.bind(this)}>Đăng xuất</a>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}