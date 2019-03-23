import React, { Component } from 'react';
import db from '../Json/employees.json';

class AnEmployee extends Component {
    componentDidMount() {
        this.rowEmployee = this.refs.employee;
        this.btnEdit = this.refs.btnEditEmployee;
        this.btnRemove = this.refs.btnRemoveEmployee;
        this.modal = document.getElementById('modalEditEmployee');
        this.input = this.modal.getElementsByClassName('form-control');
        this.hoverEmployee();
        this.clickEdit();
        this.clickRemove();
    }

    clickEdit(){
        this.btnEdit.addEventListener('click',function(){
            this.input[0].value = this.props.id;
            this.input[1].value = this.props.hoten;
            this.input[2].value = this.props.ngaysinh;
            this.input[3].value = this.props.vaitro;
            this.input[4].value = this.props.luong;
        }.bind(this));
    }

    clickRemove(){
        this.btnRemove.addEventListener('click',function(){
            if (window.confirm("Đồng ý xóa nhân viên này")){
                this.props.removeEmployee(this.props.id);
            }
        }.bind(this));
    }

    hoverEmployee() {
        var self = this;
        this.rowEmployee.addEventListener("mousemove", function () {
            self.props.functResetStyle();
            self.btnEdit.style.backgroundColor = "#ff6600";
            self.btnRemove.style.backgroundColor = "#ff0000";
            self.btnEdit.style.borderRadius = "20%";
            self.btnRemove.style.borderRadius = "20%";
            this.style.backgroundColor = "#ccd9ff";
        });
    }

    render() {
        return (
            <tr ref="employee" className="row-employee">
                <td>{this.props.id}</td>
                <td>{this.props.hoten}</td>
                <td>{this.props.ngaysinh}</td>
                <td>{this.props.vaitro}</td>
                <td>{this.props.luong}</td>
                <td>{this.props.danglam}</td>
                <td>
                    <button type="button" ref="btnEditEmployee" className="btn btn-warning btn-editEmployee" data-toggle="modal" data-target="#modalEditEmployee">Edit</button>
                </td>
                <td>
                    <button type="button" ref="btnRemoveEmployee" className="btn btn-danger btn-removeEmployee">Xóa</button>
                </td>
            </tr>
        );
    }
}

export default AnEmployee