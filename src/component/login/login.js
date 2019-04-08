import React, { Component } from 'react';
import MyRouter from '../MyRouter';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Header from '../header/header';

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: "true",
            reset:1
        }

        this.account = "";
        this.password = "";
    }

    componentWillMount(){
        this.users = [];
        this.loadData();
        console.log(this.users);
    }

    componentDidMount() {
        this.handleClick();
    }

    loadData(){
        const data = {
            name: 1
        };
        const url = "http://localhost:3001/";
        const response = fetch(url, {
            method: 'GET',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrer: "no-referrer"
        }).then(response => response.json())
            .then(data => {
                data.map((value, key) => {
                    console.log(value);
                    this.users.push(value);
                })
            })
    }

    reset(){
        this.setState({
            reset:3
        });
    }


    handleClick() {
        let linkGo = document.getElementsByClassName('btn-loginIn');
        linkGo[0].addEventListener('click', function (event) {
            let count = 0;
            const input = document.getElementsByClassName('txtLogin');

            this.users.map((value, key) => {
                if (input[0].value === value.user_account && input[1].value === value.user_password) {
                    this.account = value.user_account;
                    this.password = value.user_password;
                    count = 1;
                    return;
                }
            })
            if (count == 0) {
                event.preventDefault();
                alert('Tài khoản hoặc mật khẩu không hợp lệ');
            }

        }.bind(this));
    }

    clickLoginUp() {
        let txtNewUser = this.refs.txtNewUser;
        let txtNewPassword = this.refs.txtNewPassword;
        let accountExit = 'true';
        console.log(this.users);

        for(let i=0;i< this.users.length;i++){
            if (this.users[i].user_account === txtNewUser.value) {
                alert('Tài khoản ' + txtNewUser.value + " đã tồn tại");
                accountExit = 'false';
                i = this.users.length+1;
            }
        }

        if (accountExit === 'true') {
            alert('Tạo tài khoản thành công!Bạn đã có thể sử dụng tài khoản vừa tạo');
            const response = fetch("http://localhost:3001/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        firstParam: txtNewUser.value,
                        secondParam: txtNewPassword.value
                    }
                })
            })
            this.setState({
                reset:3
            });
        }
    }

    render() {
        return (
            <div id="Login">
                <div className="Login-BackGround">
                    <div className="background-up"></div>
                    <div className="background-down">
                        <img className="img1" src="./img/cheef1.jpg" alt="cheef1" />
                        <img className="img2" src="./img/cheef2.jpg" alt="cheef2" />
                    </div>
                </div>
                <div className="Login-Form" ref="login_form">
                    <div className="title" ref="title_login">Login in</div>
                    <input type="text" className="txtLogin txtUser" placeholder="User" autoFocus />
                    <input type="password" className="txtLogin txtPassword" placeholder="Password" />
                    <div className="forgot-password">
                        <i className="fa fa-question-circle" style={{ marginRight: "7px" }} aria-hidden="true"></i>
                        <a href="https://www.google.com/search?ei=2LGUXNiYA87W-Qb4kJm4Bg&q=how+to+find+my+password+on+the+web+of+V%C5%A9+Duy&oq=how+to+find+my+password+on+the+web+of+V%C5%A9+Duy&gs_l=psy-ab.3..33i160.1613.11080..11954...5.0..0.194.3729.1j25......0....1..gws-wiz.......0i71j0i203j0i22i30j0i22i10i30j33i22i29i30j33i21.eNaSd2yZGGA">Forgot Password</a>
                    </div>
                    <NavLink to="/dashboard" className="btn btn-loginIn">Go</NavLink>
                    <div className="form-login-up" ref="loginup_form">
                        <hr />
                        <input type="text" ref="txtNewUser" className="txtLoginUp newUser" placeholder="User" />
                        <input type="password" ref="txtNewPassword" className="txtLoginUp newPassword" placeholder="Password" />
                        <input type="text" ref="txtNewEmail" className="txtLoginUp newEmail" placeholder="abcxyz@gjgjg.ads" />
                    </div>
                    <button className="btn btn-loginUp" onClick={this.clickLoginUp.bind(this)}>Login up</button>
                </div>
            </div>
        );
    }
}

export default login;