import React, { Component } from 'react';
import MyRouter from '../myrouter';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        this.users = [];
        this.loadData();
        this.account = "";
        this.password = "";

        this.state = {
            reset: 1,
            redirectToReferrer: "false"
        }
    }

    loadData() {
        const url = "http://localhost:3001/";
        fetch(url, {
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
                    this.users.push(value);
                })
            });
    }

    reset() {
        this.setState({
            reset: 3
        });
    }

    login() {
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
        if (count === 0) {
            alert('Tài khoản hoặc mật khẩu không hợp lệ');
        } else {
            fakeAuth.authenticate(() => {
                this.setState(() => ({
                    redirectToReferrer: "true"
                }))
            });
        }
    }

    clickLoginUp() {
        let txtNewUser = this.refs.txtNewUser.value.trim();
        let txtNewPassword = this.refs.txtNewPassword.value.trim();
        let accountExit = 'true';

        if(txtNewUser.length === 0 || txtNewPassword.length === 0){
            accountExit = 'false';
            alert('Hãy điền đầy đủ thông tin');
        }
        else for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].user_account === txtNewUser) {
                alert('Tài khoản ' + txtNewUser + " đã tồn tại");
                accountExit = 'false';
                i = this.users.length + 1;
            }
        }

        if (accountExit === 'true') {
            alert('Tạo tài khoản thành công!Bạn đã có thể sử dụng tài khoản vừa tạo');
            fetch("http://localhost:3001/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        firstParam: txtNewUser,
                        secondParam: txtNewPassword
                    }
                })
            });
            this.setState({
                reset: 3
            });
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === "true") {
            return <Redirect to="/dashboard"/>
        }
        else return (
                <div id="Login">
                    <div className="Login-BackGround">
                        <div className="background-up"></div>
                        <div className="background-down">
                            <img className="img1" src="../img/cheef1.jpg" alt="cheef1" />
                            <img className="img2" src="../img/cheef2.jpg" alt="cheef2" />
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
                        <button className="btn btn-loginIn" onClick={this.login.bind(this)}>Go</button>
                        {/* <div style={{ width: "100%", height: "1px", backgroundColor: "#4298f4", marginLeft: "0px", marginTop: "15px"}}></div> */}
                        <hr/>
                        <div className="form-login-up" ref="loginup_form">
                            <div className="input-container">
                                <i className="fa fa-user icon"></i>
                                <input className="input-field" ref="txtNewUser" type="text" placeholder="Username" name="usrnm" />
                            </div>
                            <div className="input-container">
                                <i className="fa fa-envelope icon"></i>
                                <input className="input-field"  type="text" placeholder="Email" name="email" />
                            </div>

                            <div className="input-container">
                                <i className="fa fa-key icon"></i>
                                <input className="input-field" ref="txtNewPassword" type="password" placeholder="Password" name="psw" />
                            </div>
                        </div>
                        <button className="btn btn-loginUp" onClick={this.clickLoginUp.bind(this)}>Log up</button>
                    </div>
                </div>
        );
    }
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(() => {
            cb();
        }, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/' }} />
    ))}/>
)

export default function MyRoute() {
    return (
        <Router>
            <div>
                <Route path="/" component={Login} />
                <PrivateRoute path='/dashboard' component={MyRouter} />
            </div>
        </Router>
    )
}
