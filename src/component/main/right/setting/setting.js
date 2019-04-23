import React, { Component } from 'react';
import db from '../Json/account.json'
import axios from 'axios';

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            reRender: 1
        }   
        this.init();
    }

    init() {
        this.id_user = localStorage.getItem('user')
        this.user = ''
        this.loadData();
    }

    loadData(){
        const url =  "http://localhost:3001/user/"+this.id_user
        axios.get(url).then(data => {
            console.log(data.data[0])
            this.user = data.data[0];
            this.reRender();    
        })
    }

    postData(url, data){
        axios({
            method:'post',
            url: url,
            data: data,
            config:{
                headers: {'Content-type':'multipart/form-data'} }
        }).then(response => {
            if(response.data === 'success')
                alert('Thay đổi thành công!!');
            else
                alert('Mật khẩu cũ sai!')    
        })
    }

    clickSave() {
        let oldPassword = this.refs.txtOldPassword.value.trim();
        let newPassword = this.refs.txtNewPassword.value.trim();

        if(oldPassword.length<=0 || newPassword.length<=0){
            alert('Hãy nhập đầy đủ')
        }else{
            const url = "http://localhost:3001/user/"+this.id_user;
            console.log(url)
            const data = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            this.postData(url,data);
        }
    }

    clickDefault() {
        if (window.confirm("Bạn có muốn đặt tài khoản về mặc định")) {
            db[0].account = db[0].accountDefault;
            db[0].password = db[0].passwordDefault;
        }
    }

    reRender(){
        this.setState ({
            reRender: 1
        })
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
                        <input id="input-account" ref="txtaccount" className="input-setting" type="text" disabled/>
                        <input id="input-passwordOld" ref="txtOldPassword" className="input-setting" type="password" autoComplete="off"/>
                        <input id="input-passwordNew" ref="txtNewPassword" className="input-setting" type="password" autoComplete="off"/>
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