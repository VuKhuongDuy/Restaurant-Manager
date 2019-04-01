import React, { Component } from 'react';
import MyRouter from '../MyRouter';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class login extends Component {
    constructor(props){
        super(props);

        this.state = {
            authenticated: "false"
        }
    }

    componentDidMount(){
        this.users = [];
        const data = {
            name: 1
        };
        const url = "http://localhost:3001/";
        const response = fetch(url, {
            method:'GET',
            mode:"cors",
            cache:"no-cache",
            credentials:"same-origin",
            headers:{
                "Content-Type":"application/json"
            },
            redirect:"follow",
            referrer:"no-referrer"
        }).then(response=>response.json())
        .then(data=>{
            this.users.push(data[0]);
            this.users.push(data[1]);
        })
    }

    authenticatedButton(){
        if(this.state.authenticated === "true")
            return <NavLink to="/dashboard" className="btn btn-loginIn">Go</NavLink>
        return <NavLink to="/" className="btn btn-loginIn">Go</NavLink>
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
                <div className="Login-Form">
                    <div className="title">Login in</div>
                    <input type="text" className="txtLogin txtUser" placeholder="User"/>
                    <input type="password" className="txtLogin txtPassword" placeholder="Password" />
                    <div className="forgot-password">
                        <i className="fa fa-question-circle" style={{marginRight:"7px"}} aria-hidden="true"></i>
                        <a href="https://www.google.com/search?ei=2LGUXNiYA87W-Qb4kJm4Bg&q=how+to+find+my+password+on+the+web+of+V%C5%A9+Duy&oq=how+to+find+my+password+on+the+web+of+V%C5%A9+Duy&gs_l=psy-ab.3..33i160.1613.11080..11954...5.0..0.194.3729.1j25......0....1..gws-wiz.......0i71j0i203j0i22i30j0i22i10i30j33i22i29i30j33i21.eNaSd2yZGGA">Forgot Password</a>
                    </div>
                    { this.authenticatedButton() }
                    <button className="btn btn-loginUp">Login up</button>
                </div>
            </div>
        );
    }
}

export default login;