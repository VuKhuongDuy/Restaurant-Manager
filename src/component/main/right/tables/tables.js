import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import TablesAddFood from './tablesAddFood'
import TablesPayment from './tablesPayment'
import Left from '../../left/left'
import ATable from './aTable'
import db from '../Json/table.json'

export default class Tables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changing: "false",
            idTableNow: 0,
            reload: 0
        };
    }

    componentDidMount() {
        console.log('did mount');
        this.rightTables = document.getElementById('right-tables');
        this.tableDetail = this.refs.Detail;
        this.btnChangeTable = this.rightTables.getElementsByClassName('select-change');
        this.tablesRoom = this.refs.tablesRoom;
        this.FormAddFood = this.rightTables.getElementsByClassName('form-AddFood');
        this.FormPayment = this.rightTables.getElementsByClassName('form-Payment');
        this.leftLink = document.getElementsByClassName('left-link');
        this.TablesLeft = this.leftLink[1];
        this.addTable();
        this.clickAddFoodAndPayment();
        this.clickReturnTableRoom();
    }

    addTable() {
        let btnAdd = document.getElementById('home-table-add');
        btnAdd.addEventListener('click', function () {
            var newTable = {
                id: db[db.length - 1].id + 1,
                status: 'false'
            };
            db.push(newTable);
            this.reRender();
        }.bind(this))
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
        this.homeTables = this.rightTables.getElementsByClassName('home-table');
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

    setIdTableChange(id) {
        this.state.idTableNow = id;
    }

    reRender(){
        this.setState({
            reload: 2
        })
    }

    HideAllSelection() {
        this.homeTables = this.rightTables.getElementsByClassName('home-table');
        for (let i = 0; i < this.homeTables.length - 1; i++) {
            let tablesSelection = this.homeTables[i].getElementsByClassName('tables-selection');
            tablesSelection[0].style.display = "none";  // cho ẩn selection đi hết
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
                                    <ATable funcIdTable={this.setIdTableChange.bind(this)} id={value.id} status={value.status} key={key} changing={this.state.changing} />
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
                            <img src="../img/table-detail.png" style={{ marginRight: '7px' }} />
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