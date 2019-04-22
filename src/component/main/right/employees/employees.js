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

        this.init();
    }

    init() {
        this.loadData();
    }

    reRender() {
        this.setState({
            restart: 2
        })
    }

    loadData() {
        this.ListEmployee = [];
        fetch('http://localhost:3001/dashboard/employees', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                data.map((value, key) => {
                    this.ListEmployee.push(value);
                })
                this.reRender();
            })
    }

    post(data, url) {
        console.log(data)
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                console.log('Change: ' + data);
                this.init();
            })
    }

    removeEmployee(id) {
        const data = {
            id: id
        }
        const url = "http://localhost:3001/dashboard/employees/remove"
        this.post(data, url)
    }

    clickAcceptEdit() {
        const url = 'http://localhost:3001/dashboard/employees/edit';
        if (window.confirm("Bạn có muốn thay đổi")) {
            const modalEdit = document.getElementById('modalEditEmployee');
            let input = modalEdit.getElementsByClassName('form-control');
            let em = ""
            for (let i = 0; i < this.ListEmployee.length; i++)
                if (this.ListEmployee[i].id == input[0].value) {
                    em.name = input[1].value;
                    em.sex = input[2].value;
                    em.birthday = input[3].value;
                    em.phone = input[4].value;
                    em.working = input[5].value;
                    em.salary = input[6].value;
                    em.countleave = input[7].value;
                    break;
                }
            this.post(em, url);
        }
    }

    clickAcceptAdd() {
        const url = 'http://localhost:3001/dashboard/employees/add';
        if (window.confirm("Bạn có muốn thêm")) {
            const modalAdd = document.getElementById('modalAddEmployee');
            let input = modalAdd.getElementsByClassName('form-control');
            let newEm = {
                id: this.ListEmployee[this.ListEmployee.length - 1].id + 1,
                name: input[1].value,
                sex: input[2].value,
                birthday: input[3].value,
                phone: input[4].value,
                working: input[5].value,
                salary: input[6].value,
                countleave: input[7].value,
            }
            this.ListEmployee.push(newEm);
            this.post(newEm, url);
            this.reRender();
        }
    }

    showListEmployee() {
        return this.ListEmployee.map((value, key) => {
            return <AnEmployee key={key}
                removeEmployee={this.removeEmployee.bind(this)}
                functResetStyle={this.set_Style_When_Click_Employee}
                id={value.id}
                name={value.name}
                sex={value.sex}
                birthday={value.birthday}
                phone={value.phone}
                working={value.working}
                salary={value.salary}
                countleave={value.countleave} />
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
                            <div className="modal-content" style={{ width: "500px", height: "670px" }}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Nhân viên mới</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="Employee-label">
                                        <label htmlFor="input-id">ID: </label>
                                        <label htmlFor="input-hoten">Họ tên: </label>
                                        <label htmlFor="input-ngaysinh">Giới tính: </label>
                                        <label htmlFor="input-vaitro">Ngày sinh: </label>
                                        <label htmlFor="input-vaitro">Sđt: </label>
                                        <label htmlFor="input-luong">Vị trí: </label>
                                        <label htmlFor="input-luong">Lương($): </label>
                                        <label htmlFor="input-luong">Nghỉ/tháng: </label>
                                    </div>
                                    <div className="Employee-input">
                                        <input type="number" className="form-control" name="quantity" min={0} max={1000} placeholder="ID" id="input-id" ref="inputID" disabled />
                                        <input type="text" className="form-control" id="input-hoten" placeholder="Họ tên" />
                                        <input type="text" className="form-control" id="input-sex" placeholder="Giới tính" />
                                        <input type="date" name="birth day" className="form-ngaysinh form-control" id="input-ngaysinh" placeholder="Ngày sinh" />
                                        <input type="text" name="phone" className="form-control" id="input-phone" placeholder="Phone" />
                                        <input type="text" className="form-control" id="input-vitri" placeholder="Vị trí" />
                                        <input type="number" className="form-control" name="quantity" min={0} max={100000000000} step={500000} placeholder="Lương" id="input-luong" ref="inputLuong" />
                                        <input type="number" className="form-control" name="quantity" min={0} max={31} placeholder="Nghỉ" id="input-count_leave" />
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
                                <th style={{ width: "4%" }}>Mã</th>
                                <th style={{ width: "18%" }}>Họ tên</th>
                                <th style={{ width: "8%" }}>Giới tính</th>
                                <th style={{ width: "17%" }}>Ngày sinh</th>
                                <th style={{ width: "10%" }}>Sđt</th>
                                <th style={{ width: "10%" }}>Vị trí</th>
                                <th style={{ width: "15%" }}>Lương($)</th>
                                <th style={{ width: "10%" }}>Nghỉ/tháng</th>
                            </tr>
                            {
                                this.showListEmployee()
                            }
                        </tbody>
                    </table>
                </div>
                <div id="modalEditEmployee" className="modal fade" tabIndex={10} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: "500px", height: "670px" }}>
                            <div className="modal-header">
                                <h4 className="modal-title">Nhân viên mới</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="Employee-label">
                                    <label htmlFor="input-id">ID: </label>
                                    <label htmlFor="input-hoten">Họ tên: </label>
                                    <label htmlFor="input-sex">Giới tính: </label>
                                    <label htmlFor="input-ngaysinh">Ngày sinh: </label>
                                    <label htmlFor="input-phone">Sđt: </label>
                                    <label htmlFor="input-vitri">Vị trí: </label>
                                    <label htmlFor="input-luong">Lương($): </label>
                                    <label htmlFor="input-count_leave">Nghỉ(tháng): </label>
                                </div>
                                <div className="Employee-input">
                                    <input type="number" className="form-control" name="quantity" min={0} max={1000} placeholder="ID" id="input-id" ref="inputID" disabled />
                                    <input type="text" className="form-control" id="input-hoten" placeholder="Họ tên" />
                                    <input type="text" className="form-control" id="input-sex" placeholder="Giới tính" />
                                    <input type="date" name="birth day" className="form-ngaysinh form-control" id="input-ngaysinh" placeholder="Ngày sinh" />
                                    <input type="text" name="phone" className="form-control" id="input-phone" placeholder="Phone" />
                                    <input type="text" className="form-control" id="input-vitri" placeholder="Vị trí" />
                                    <input type="number" className="form-control" name="quantity" min={0} max={100000000000} step={500000} placeholder="Lương" id="input-luong" ref="inputLuong" />
                                    <input type="number" className="form-control" name="quantity" min={0} max={31} placeholder="Nghỉ" id="input-count_leave" />
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