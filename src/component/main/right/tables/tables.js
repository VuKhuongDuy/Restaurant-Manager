import React, { Component } from 'react'
import ATable from './aTable'
import db from '../Json/table.json'

export default class Tables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changing: "false",
            idTableNow: "0",
            reload: "0",
            isLoading: "true"
        };

        this.now = new Date();
        this.date = this.now.getDate() + "/" + this.now.getMonth() + "/" + this.now.getFullYear();
        this.tables = [];
        this.billdetail = [];
        this.tableClicked = {
            id_table: 0,
            status: 'empty'
        }
        this.loadData();
    }

    componentDidMount() {
        console.log('table did mount');
        this.rightTables = document.getElementById('right-tables');
        this.tableDetail = this.refs.Detail;
        this.btnChangeTable = this.rightTables.getElementsByClassName('select-change');
        this.tablesRoom = this.refs.tablesRoom;
        this.leftLink = document.getElementsByClassName('left-link');
        this.TablesLeft = this.leftLink[1];
        this.addTable();
        this.clickReturnTableRoom();
    }

    loadData() {
        const data = {
            name: 1
        }

        const url = "http://localhost:3001/dashboard/tables";
        fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
        }).then(response => response.json())
            .then(data => {
                data[0].map((value, key) => {
                    this.tables.push(value);
                });
                data[1].map((value, key) => {
                    this.billdetail.push(value);
                });

                this.setState({
                    isLoading: 'false'
                });
            })
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
        }.bind(this));
    }

    reRender() {
        this.setState({
            reload: 2
        })
    }

    HideAllSelection() {
        if (this.state.isLoading === "false") {
            this.homeTables = this.rightTables.getElementsByClassName('home-table');
            for (let i = 0; i < this.homeTables.length - 1; i++) {
                let tablesSelection = this.homeTables[i].getElementsByClassName('tables-selection');
                tablesSelection[0].style.display = "none";
            }
        }
    }

    renderTable() {
        return this.tables.map((value, key) => {
            return (
                <ATable HideAllSelection={this.HideAllSelection.bind(this)} postData={this.getData.bind(this)} id={value.id} status={value.status} key={key} changing={this.state.changing} />
            )
        })
    }

    getData(id, status) {
        this.tableClicked.id_table = id;
        this.tableClicked.status = status;
        this.reRender();
    }

    renderBillDetail() {
        return this.billdetail.map((value, key) => {
            if (value.id_table === this.tableClicked.id_table) {
                console.log(value);
                return (
                    <tr key={key}>
                        <td>{value.food_name}</td>
                        <td>{value.food_count}</td>
                    </tr>
                )
            }
        })
    }

    renderBillID() {
        return (
            <div className="txtIDTable">{this.tableClicked.id_table}</div>
        )
    }

    render() {
        return (
            <div>
                <div id="right-tables">
                    <div id="tables-room" ref="tablesRoom">
                        {
                            this.state.isLoading === 'false' ? this.renderTable() : <div></div>
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
                            <div className="txtDate">{this.date}</div>
                        </div>
                        <div className="idTable">
                            <i className="fa fa-key" aria-hidden="true" style={{ position: "absolute", left: "3px", marginTop: '12px', color: '#b2ad9b' }}></i>
                            <div className="lblIDTable">ID bàn</div>
                            {this.renderBillID()}
                        </div>
                        <div className="table-detail-menu">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Tên món</th>
                                        <th>Số lượng</th>
                                    </tr>
                                    {this.renderBillDetail()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}