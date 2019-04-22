import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import TablesAddFood from './tablesAddFood'
import TablesPayment from './tablesPayment'

class ATable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: 'open',
        }

        this.urlAddFood = "/dashboard/tables/addfood/" + this.props.id;
        this.urlPayment = "/dashboard/tables/payment/" + this.props.id;
    }

    componentDidMount() {
        this.clickTable();
    }

    postData(data) {
        console.log('button add food')
        const url = "http://localhost:3001/dashboard/tables/put";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ data }),
        }).then(response => console.log('success', JSON.stringify(response)))
            .catch(err => console.error('Error', err));
    }

    putData_changeTable(idOld,idNew){
        fetch('http://localhost:3001/dashboard/tables/change',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id_Old: idOld,
                id_New: idNew
            })
        })
    }

    tableImg() {
        if (this.props.status === "empty")
            return <img src="../img/table-no.png" alt="table" className="home-room-img" />
        else if (this.props.status === "notempty")
            return <img src="../img/table-havePeo.png" alt="table" className="home-room-img" />
    }

    changeTable() {
        let canChange = true
        const id_table_willchange = prompt("CHANGE FROM TABLE "+this.props.id+" -> TABLE ");
        console.log(id_table_willchange);
        this.props.tables.map((value,key)=>{
            if(value.id == id_table_willchange && value.status == 'notempty')
                canChange = false
        })
        if(canChange)
            this.putData_changeTable(this.props.id,id_table_willchange);
    }

    clickAddFood() {
        this.postData(this.props.id);
    }

    clickTable() {
        const table = this.refs.table;
        table.addEventListener('click', function () {
            this.props.HideAllSelection();
            let select = this.refs.selection;
            if (this.state.click === "open") {
                select.style.display = "inline";
                this.state.click = "close";
            } else if (this.state.click === "close") {
                select.style.display = "none";
                this.state.click = "open";
            }
            this.props.setTableClicked(this.props.id, this.props.status);
        }.bind(this));
    }

    render() {
        // const location_addFood = {
        //     pathname: this.urlAddFood,
        //     state: {data: this.bill}
        // }
        // const location_payment = {
        //     pathname: this.urlPayment,

        // }

        return (
            <div className="home-table" ref="table">
                <div style={{ float: 'left' }}>
                    <div className="idTable">{this.props.id}</div>
                    {this.tableImg()}
                </div>
                <div className="tables-selection" ref='selection'>
                    <li className="select select-add" id="selection-addTable" onClick={this.props.addFood}>
                        <NavLink to={this.urlAddFood} onClick={this.clickAddFood.bind(this)}>
                            <i className="fa fa-plus" aria-hidden="true" style={{ color: 'green', float: 'left', marginTop: '5px' }}></i>
                            <div>Gọi món</div>
                        </NavLink>
                    </li>
                    <li className="select select-change" onClick={this.changeTable.bind(this)} id="selection-changeTable">
                        <div>
                            <i className="fa fa-refresh" aria-hidden="true" style={{ color: 'blue', float: 'left', marginTop: '5px' }}></i>
                            <div className="txtChuyenBan">Chuyển bàn</div>
                        </div>
                    </li>
                    <li className="select select-payment" id="selection-Payment">
                        <NavLink to={this.urlPayment} >
                            <i className="fa fa-credit-card-alt" aria-hidden="true" style={{ color: 'red', float: 'left', marginTop: '5px' }}></i>
                            <div>Thanh toán</div>
                        </NavLink>
                    </li>
                </div>
            </div>
        );
    }
}

export default ATable