import React, { Component } from 'react'
import App from '../../App'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.user = ''
        this.state = {
            setting: "false",
            render: 1
        }
        this.id_user = localStorage.getItem('user');
        this.loadData();
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

    loadData(){
        const url =  "http://localhost:3001/user/"+this.id_user
        axios.get(url).then(data => {
            
            this.user = data.data[0].user_account;
            this.reRender();
        })
    }
    
    reRender(){
        this.setState({
            render:1
        })
    }

    clickLogOut(){
        localStorage.setItem('user','');
    }

    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <img src="../../../img/logo.png" alt="logo" href="#"/>
                </div>
                <div className="header-title">
                    <div>Royal Restaurant</div>
                </div>
                <div className="header-user">
                    <div id="header-user-name">{this.user}</div>
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