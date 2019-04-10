import React, { Component } from 'react';
import db from '../Json/employees.json'
import AnEmployee from './anEmployee'

class Employees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: "false",
            restart: 1
        }
    }

    componentWillMount() {
        this.ListEmployee = [];
        this.changeDBToObject();
    }

    reRender() {
        this.setState({
            restart: 2
        })
    }

    changeDBToObject() {
        db.map((value, key) => {
            let aEmployee = {
                id: value.id,
                hoten: value.hoten,
                ngaysinh: value.ngaysinh,
                vaitro: value.vaitro,
                luong: value.luong,
                danglam: value.danglam
            }
            this.ListEmployee.push(aEmployee);
        })
    }

    removeEmployee(id) {
        this.ListEmployee.map((value, key) => {
            if (value.id == id) {
                this.ListEmployee.splice(key, 1);
                this.reRender();
                return true;
            }
        });
    }

    clickAcceptEdit() {
        if (window.confirm("Bạn có muốn thay đổi")) {
            const modalEdit = document.getElementById('modalEditEmployee');
            let input = modalEdit.getElementsByClassName('form-control');
            this.ListEmployee.map((value, key) => {
                if (value.id == input[0].value) {
                    value.hoten = input[1].value;
                    value.ngaysinh = input[2].value;
                    value.vaitro = input[3].value;
                    value.luong = input[4].value;
                    this.reRender();
                    return;
                }
            });
        }
    }

    clickAcceptAdd() {
        if (window.confirm("Bạn có muốn thêm")){
            const modalAdd = document.getElementById('modalAddEmployee');
            let input = modalAdd.getElementsByClassName('form-control');
            let newEm = {
                id: this.ListEmployee[this.ListEmployee.length-1].id+1,
                hoten: input[1].value,
                ngaysinh: input[2].value,
                vaitro: input[3].value,
                luong: input[4].value,
                danglam:"Không"
            }
            this.ListEmployee.push(newEm);
            console.log(this.ListEmployee);
            this.reRender();
        }
    }

    showListEmployee() {
        return this.ListEmployee.map((value, key) => {
            return <AnEmployee key={key} removeEmployee={this.removeEmployee.bind(this)} functResetStyle={this.set_Style_When_Click_Employee} id={value.id} hoten={value.hoten} ngaysinh={value.ngaysinh} vaitro={value.vaitro} luong={value.luong} danglam={value.danglam} />
        })
    }

    set_Style_When_Click_Employee() {
        var listEmployee = document.getElementsByClassName('row-employee');
        for (var i = 0; i < listEmployee.length; i++) {
            let btnEdit = listEmployee[i].getElementsByClassName('btn-editEmployee');
            let btnRemove = listEmployee[i].getElementsByClassName('btn-removeEmployee');
            btnEdit[0].style.backgroundColor = "#663d00";
            btnRemove[0].style.backgroundColor = "#660000";
            btnEdit[0].style.borderRadius = "35%";
            btnRemove[0].style.borderRadius = "35%";
            listEmployee[i].style.backgroundColor = "white";
        }
    }

    render() {
        return (
            <div id="Employees">
                <div id="Employees-header">
                    <img src="../img/employee.png" alt="logo" className="Employees-img" />
                    <div id="Employees-title">Danh sách nhân viên</div>
                    <button type="button" className="btn btn-success Employees-btn-addEmployee" data-toggle="modal" data-target="#modalAddEmployee">
                        <i className="fa fa-plus-square" aria-hidden="true" style={{ marginRight: "5px" }}></i>
                        Thêm nhân viên
                    </button>
                    <div id="modalAddEmployee" className="modal fade" tabIndex={10} role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Nhân viên mới</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="Employee-label">
                                        <label htmlFor="input-id">ID: </label>
                                        <label htmlFor="input-hoten">Họ tên: </label>
                                        <label htmlFor="input-ngaysinh">Ngày sinh: </label>
                                        <label htmlFor="input-vaitro">Vai trò: </label>
                                        <label htmlFor="input-luong">Lương: </label>
                                    </div>
                                    <div className="Employee-input">
                                        <input type="text" className="form-control" name="quantity" min={0} max={1000} placeholder="ID" ref="inputID" />
                                        <input type="text" className="form-control" placeholder="Họ tên" />
                                        <input type="date" name="birth day" className="form-ngaysinh form-control" />
                                        <input type="text" className="form-control" placeholder="Vai trò" />
                                        <input type="number" className="form-control" name="quantity" min={0} max={100000000000} placeholder="Lương" ref="inputLuong" />
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ position: "relative" }}>
                                    <input type="button" ref="acceptAddEmployee" onClick={this.clickAcceptAdd.bind(this)} className="btn btn-success btn-accept-employee" value="Xác nhận" />
                                </div>
                            </div>{/* /.modal-content */}
                        </div>{/* /.modal-dialog */}
                    </div>{/* /.modal */}
                </div>
                <div id="Employees-main">
                    <table>
                        <tbody>
                            <tr>
                                <th style={{ width: "5%" }}>Mã</th>
                                <th style={{ width: "25%" }}>Họ tên</th>
                                <th style={{ width: "17%" }}>Ngày sinh</th>
                                <th style={{ width: "13%" }}>Vai trò</th>
                                <th style={{ width: "17%" }}>Lương</th>
                                <th style={{ width: "8%" }}>Đang làm</th>
                                <th style={{ width: "5%" }}></th>
                                <th style={{ width: "5%" }}></th>
                            </tr>
                            {
                                this.showListEmployee()
                            }
                        </tbody>
                    </table>
                </div>
                <div id="modalEditEmployee" className="modal fade" tabIndex={10} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Nhân viên mới</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="Employee-label">
                                    <label htmlFor="input-id">ID: </label>
                                    <label htmlFor="input-hoten">Họ tên: </label>
                                    <label htmlFor="input-ngaysinh">Ngày sinh: </label>
                                    <label htmlFor="input-vaitro">Vai trò: </label>
                                    <label htmlFor="input-luong">Lương: </label>
                                </div>
                                <div className="Employee-input">
                                    <input type="number" className="form-control" name="quantity" min={0} max={1000} placeholder="ID" id="input-id" ref="inputID" />
                                    <input type="text" className="form-control" id="input-hoten" placeholder="Họ tên" />
                                    <input type="text" name="birth day" className="form-ngaysinh form-control" id="input-ngaysinh" />
                                    <input type="text" className="form-control" id="input-vaitro" placeholder="Vai trò" />
                                    <input type="number" className="form-control" name="quantity" min={0} max={100000000000} placeholder="Lương" id="input-luong" ref="inputLuong" />
                                </div>
                            </div>
                            <div className="modal-footer" style={{ position: "relative" }}>
                                <input type="button" ref="acceptEditEmployee" onClick={this.clickAcceptEdit.bind(this)} className="btn btn-success btn-accept-employee" value="Xác nhận" />
                            </div>
                        </div>{/* /.modal-content */}
                    </div>{/* /.modal-dialog */}
                </div>{/* /.modal */}
            </div>
        );
    }
}

export default Employees;