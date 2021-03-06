import React, { Component } from 'react'
import ATable from './aTable'
import axios from 'axios';

export default class Tables extends Component {
    constructor(props) {
        super(props);

        this.init();
        this.state = {
            changing: "false",
            idTableNow: 0,
            reload: "0",
            isLoading: "true"
        };
        this.tableClicked = {
            id_table: 0,
            status: 'empty'
        }

        this.loadData();
    }

    init(){
        this.now = new Date();
        this.date = this.now.getDate() + "/" + this.now.getMonth() + "/" + this.now.getFullYear();
        this.tables = [];
        this.billdetail = [];
    }

    componentDidMount() {
        this.rightTables = document.getElementById('right-tables');
        this.tableDetail = this.refs.Detail;
        this.btnChangeTable = this.rightTables.getElementsByClassName('select-change');
        this.tablesRoom = this.refs.tablesRoom;
        this.leftLink = document.getElementsByClassName('left-link');
        this.TablesLeft = this.leftLink[1];
        this.clickReturnTableRoom();
    }

    loadData() {
        this.init();
        const url = "http://localhost:3001/dashboard/tables";
        console.log('load-table');
        axios.get(url).then(data => {
                console.log('load-table-1')
                data.data[0].map((value, key) => {
                    console.log('map1111111')
                    this.tables.push(value);
                });
                data.data[1].map((value, key) => {
                    this.billdetail.push(value);
                });
                console.log('table: '+ this.tables)

                this.setState({
                    isLoading: 'false'
                });
            })
    }

    postData(url) {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({})
        });
        this.setState({
            reset: 3
        });
    }

    setTableClicked(id, status) {
        this.tableClicked.id_table = id;
        this.tableClicked.status = status;
        this.reRender();
    }

    addTable() {
        this.postData("http://localhost:3001/dashboard/tables");
        this.loadData();
    }

    clickReturnTableRoom() {
        this.TablesLeft.addEventListener('click', function () {
            this.HideAllSelection();
            this.tablesRoom.style.display = "inline";
            this.tableDetail.style.display = "block";
        }.bind(this));
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

    reRender() {
        this.setState({
            reload: 2
        })
    }
    
    renderTable() {
        return this.tables.map((value, key) => {
            return (
                <ATable HideAllSelection={this.HideAllSelection.bind(this)} setTableClicked={this.setTableClicked.bind(this)} tables={this.tables} id={value.id} status={value.status} key={key}/>
            )
        })
    }

    renderBillDetail() {
        if(this.tableClicked.status == "notempty"){
            return this.billdetail.map((value, key) => {
                if (value.id_table === this.tableClicked.id_table) {
                    return (
                        <tr key={key}>
                            <td>{value.food_name}</td>
                            <td>{value.food_count}</td>
                        </tr>
                    )
                }
            })
        }
    }

    renderBillID() {
        return (
            <div className="txtIDTable">{this.tableClicked.id_table}</div>
        )
    }

    render() {
        {console.log('table: '+this.tables)}
        return (
            <div>
                <div id="right-tables">
                    <div id="tables-room" ref="tablesRoom">
                        {
                            this.state.isLoading === 'false' ? this.renderTable() : <div></div>
                        }
                        <div className="home-table" id="home-table-add" onClick={this.addTable.bind(this)}>
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