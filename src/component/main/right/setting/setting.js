import React, { Component } from 'react';
import db from '../Json/account.json'

class Setting extends Component {
    componentDidMount() {
        this.manager = [];
        // db.map(value,key)
    }
    clickSave() {
        let account = this.refs.txtaccount;
        let oldPassword = this.refs.txtOldPassword;
        let newPassword = this.refs.txtNewPassword;
        account.value = account.value.trim();
        oldPassword.value = oldPassword.value.trim();
        newPassword.value = newPassword.value.trim();

        if (db[0].password === oldPassword.value) {
            db[0].account = account.value;
            db[0].account = newPassword;
            alert("Lưu thành công");
        } else {
            alert("Tài khoản mật khẩu không chính xác");
        }
    }

    clickDefault() {
        if (window.confirm("Bạn có muốn đặt tài khoản về mặc định")) {
            db[0].account = db[0].accountDefault;
            db[0].password = db[0].passwordDefault;
        }
    }

    render() {
        return (
            <div>
                <div className="form-SettingAccount">
                    <img src="../img/locker.png" style={{ width: "430px", height: "auto", position: "absolute", right: "0px", top: "300px", opacity: "0.2" }} />
                    <div id="title-setting">
                        <i className="fa fa-wrench" id="title-setting" aria-hidden="true">  Thiết lập mật khẩu</i>
                    </div>
                    <div className="lblSetting">
                        <label htmlFor="input-account">Account:</label>
                        <label htmlFor="input-passwordOld">Mật khẩu cũ:</label>
                        <label htmlFor="input-passwordNew">Mật khẩu mới:</label>
                    </div>
                    <div className="inputSetting">
                        <input id="input-account" ref="txtaccount" className="input-setting" type="text" />
                        <input id="input-passwordOld" ref="txtOldPassword" className="input-setting" type="password" />
                        <input id="input-passwordNew" ref="txtNewPassword" className="input-setting" type="password" />
                    </div>
                    <button className="btn btn-success" onClick={this.clickSave.bind(this)}>
                        <i className="fa fa-check" aria-hidden="true" style={{ marginRight: "6px" }}></i>Lưu
                    </button>
                    <button className="btn btn-default" onClick={this.clickDefault.bind(this)}>Đặt mặc định</button>
                </div>
            </div>
        );
    }
}

export default Setting;