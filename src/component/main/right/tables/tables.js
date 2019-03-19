import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import TablesAddFood from './tablesAddFood'
import TablesPayment from './tablesPayment'
import Left from '../../left/left'
import ATable from './aTable'
import db from '../table.json'

export default class Tables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changing: "false",
            idTableChange: "0",
        }
    }

    componentDidMount() {
        this.rightTables = document.getElementById('right-tables');
        this.homeTables = this.rightTables.getElementsByClassName('home-table');
        this.tableDetail = this.refs.Detail;
        this.btnChangeTable = this.rightTables.getElementsByClassName('select-change');
        this.tablesRoom = this.refs.tablesRoom;
        this.FormAddFood = this.rightTables.getElementsByClassName('form-AddFood');
        this.FormPayment = this.rightTables.getElementsByClassName('form-Payment');
        this.leftLink = document.getElementsByClassName('left-link');
        this.TablesLeft = this.leftLink[1];
        this.clickTable();
        this.addTable();
        this.ChangeTable();
        this.clickAddFoodAndPayment();
        this.clickReturnTableRoom();
    }


    addTable() {
        let btnAdd = document.getElementById('home-table-add');
        let self = this;
        btnAdd.addEventListener('click', function () {
            var tablesRoom = document.getElementById('tables-room');
            var homeTable = tablesRoom.getElementsByClassName('home-table');
            var newTable = document.createElement('div');
            newTable.className = 'home-table';
            newTable.innerHTML = homeTable[0].innerHTML;
            tablesRoom.insertBefore(newTable, btnAdd);
            self.clickTable();
            self.addTable();
            self.ChangeTable();
            self.clickAddFoodAndPayment();
        })
    }

    clickReturnTableRoom() {
        this.TablesLeft.addEventListener('click', function () {
            this.HideAllSelection();
            this.tablesRoom.style.display = "inline";
            this.tableDetail.style.display = "block";
            this.FormAddFood[0].style.display = "none";
            this.FormPayment[0].style.display = "none";
        }.bind(this));
    }

    // neet edit
    clickAddFoodAndPayment() {
        for (let i = 0; i < this.homeTables.length - 1; i++) {
            let btnAdd = this.homeTables[i].getElementsByClassName("select-add");
            let btnPayment = this.homeTables[i].getElementsByClassName("select-payment");
            btnAdd[0].addEventListener('click', function () {
                this.tablesRoom.style.display = "none";
                this.tableDetail.style.display = "none";
                this.FormAddFood[0].style.display = "inline";
                this.FormPayment[0].style.display = "none";
            }.bind(this));

            btnPayment[0].addEventListener('click', function () {
                let txtIDTablePayment = this.FormPayment[0].getElementsByClassName('detail-txtIDTable');
                let IDTable = this.homeTables[i].getElementsByClassName('idTable');
                txtIDTablePayment[0].innerHTML = IDTable[0].innerHTML;
                this.tablesRoom.style.display = "none";
                this.tableDetail.style.display = "none";
                this.FormAddFood[0].style.display = "none";
                this.FormPayment[0].style.display = "inline";
            }.bind(this));
        }
    }

    // need edit
    ChangeTable() {
        let self = this;
        for (let i = 0; i < this.btnChangeTable.length; i++) {
            this.btnChangeTable[i].addEventListener('click', function (e) {
                if (self.state.changing == "false") {
                    self.state.changing = "true";
                    self.HideAllSelection();
                }
            });
        }
    }

    HideAllSelection() {
        for (let i = 0; i < this.homeTables.length - 1; i++) {
            let tablesSelection = this.homeTables[i].getElementsByClassName('tables-selection'); // lấy selection từng bàn
            tablesSelection[0].style.display = "none";  // cho ẩn selection đi hết
        }
    }

    clickTable() {
        var self = this;
        var lblIDTable = self.tableDetail.getElementsByClassName('txtIDTable');

        for (let i = 0; i < this.homeTables.length - 1; i++) {
            this.homeTables[i].addEventListener('click', function (e) { //sự kiện click cho từng bàn

                var idTableThis = this.getElementsByClassName('idTable');  // id của bàn vừa click

                if (self.state.changing == "false") {  // so sánh xem có đang chuyển bàn
                    let thisTableSelection = this.getElementsByClassName('tables-selection'); // lấy selection của bàn vừa click
                    self.state.idTableChange = idTableThis[0].innerHTML;  // cho id bàn muốn chuyển = id bàn vừa click
                    self.HideAllSelection();
                    thisTableSelection[0].style.display = "inline-block"; // hiện selection của bàn mình chọn
                    lblIDTable[0].innerHTML = idTableThis[0].innerHTML; // thay đổi id ở bảng chi tiết
                    this.style.color = "red";
                } else if (self.state.changing == "true") {
                    if (idTableThis[0].innerHTML == self.state.idTableChange) // kiểm tra xem bàn vừa click có trùng id vối bàn định chuyển đi
                        return;
                    for (let i = 0; i < self.homeTables.length - 1; i++) {
                        let idTable = self.homeTables[i].getElementsByClassName('idTable'); // id của từng bàn
                        if (idTable[0].innerHTML == self.state.idTableChange) {  // so sánh id từng bàn với id bàn cũ
                            idTable[0].innerHTML = idTableThis[0].innerHTML; // đổi id 2 bàn cho nhau
                            idTableThis[0].innerHTML = self.state.idTableChange; // đổi id 2 bàn cho nhau
                            self.state.changing = "false";
                            this.style.color = "black";
                            return;
                        }
                    }
                }
            })
        }
    }

    render() {
        return (
            <div>
                <div id="right-tables">
                    <div id="tables-room" ref="tablesRoom">
                        {
                            db.map((value, key) => {
                                return (
                                    <ATable id={value.id} status={value.status} key={key} />
                                )
                            })
                        }
                        <div className="home-table" id="home-table-add">
                            <div className="txtAdd">+</div>
                            <div className="opacity"></div>
                        </div>
                    </div>
                    <div id="table-detail" ref="Detail">
                        <div className="title">
                            <img src="./img/table-detail.png" style={{ marginRight: '7px' }} />
                            Chi tiết bàn</div>
                        <div className="date">
                            <i className="fa fa-calendar-check-o" aria-hidden="true" style={{ position: "absolute", left: "3px", marginTop: '12px', color: '#1f67af' }}></i>
                            <div className="lblDate">Ngày tháng</div>
                            <div className="txtDate">111</div>
                        </div>
                        <div className="idTable">
                            <i className="fa fa-key" aria-hidden="true" style={{ position: "absolute", left: "3px", marginTop: '12px', color: '#b2ad9b' }}></i>
                            <div className="lblIDTable">ID bàn</div>
                            <div className="txtIDTable">1</div>
                        </div>
                        <div className="table-detail-menu">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Tên món</th>
                                        <th>Số lượng</th>
                                    </tr>
                                    <tr>
                                        <td>asdasdsdasdasdasasdasdsdasdasdasasdasdsdasdasdasasdasdsdasdasdasasdasdsdasdasdasasdasdsdasdasdasasdasdsdasdasdasasdasdsdasdasdas</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <TablesAddFood />
                    <TablesPayment />
                </div>
            </div>
        )
    }
}