import React, { Component } from 'react';

class AnEmployee extends Component {
    constructor(props){
        super(props);
        let newDate =new Date(this.props.birthday);
        let date = new Date(newDate.getTime()+24*60*60*1000)
        let str = JSON.stringify(date);
        let index = str.indexOf('T');
        this.strDate = str.substring(1,index);
    }

    componentDidMount() {
        this.rowEmployee = this.refs.employee;
        this.btnEdit = this.refs.btnEditEmployee;
        this.btnRemove = this.refs.btnRemoveEmployee;
        this.modal = document.getElementById('modalEditEmployee');
        this.input = this.modal.getElementsByClassName('form-control');
        this.clickEdit();
        this.clickRemove();
    }

    clickEdit(){
        this.btnEdit.addEventListener('click',function(){
            this.input[0].value = this.props.id;
            this.input[1].value = this.props.name;
            this.input[2].value = this.props.sex;
            this.input[3].value = this.props.birthday;
            this.input[4].value = this.props.phone;
            this.input[5].value = this.props.working;
            this.input[6].value = this.props.salary;
            this.input[7].value = this.props.countleave;
        }.bind(this));
    }

    clickRemove(){
        this.btnRemove.addEventListener('click',function(){
            if (window.confirm("Đồng ý xóa nhân viên "+this.props.name)){
                this.props.removeEmployee(this.props.id);
            }
        }.bind(this));
    }

    render() {

        return (
            <tr ref="employee" className="row-employee">
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.sex}</td>
                <td>{this.strDate}</td>
                <td>{this.props.phone}</td>
                <td>{this.props.working}</td>
                <td>{this.props.salary}</td>
                <td>{this.props.countleave}</td>
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