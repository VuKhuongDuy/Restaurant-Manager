import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <img src="./img/logo.png" alt="logo" />
                </div>
                <div className="header-title">
                    <div>Royal Restaurant</div>
                </div>
                <div className="header-user">
                    <div id="header-user-name">Vũ Duy</div>
                    <div id="header-user-setting">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        <i className="fa fa-caret-down "></i>
                    </div>
                </div>
            </div>
        )
    }
}