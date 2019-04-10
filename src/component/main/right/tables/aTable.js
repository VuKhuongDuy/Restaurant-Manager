import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from "react-router-dom";
import TablesAddFood from './tablesAddFood'
import TablesPayment from './tablesPayment'

class ATable extends Component {
    constructor(props){
        super(props);
        this.state = {
            click : 'open',
        }

        this.urlAddFood = "/dashboard/tables/addfood/"+this.props.id;
        this.urlPayment = "/dashboard/tables/payment/"+this.props.id;
    }

    componentDidMount(){
        this.clickTable();
    }
    
    tableImg() {
        if (this.props.status === "empty")
            return <img src="../img/table-no.png" alt="table" className="home-room-img" />
        else if (this.props.status === "notempty")
            return <img src="../img/table-havePeo.png" alt="table" className="home-room-img" />
    }

    changeTable(){  
        if(this.props.changing === "false"){
            // this.props.changing = "true";
            // this.props.funcIdTable(this.props.id);
        }else if(this.props.changing === "true"){
            // this.props.changing = "false";
        }
    }

    clickTable(){  
        const table = this.refs.table;
        table.addEventListener('click',function(){
            this.props.HideAllSelection();
            let select = this.refs.selection;
            if (this.state.click === "open") {
                select.style.display = "inline";
                this.state.click = "close";
            } else if(this.state.click === "close") {
                select.style.display = "none";
                this.state.click = "open";
            }
            this.props.postData(this.props.id,this.props.status);
        }.bind(this));
    }

    render() {
        return (
            <div className="home-table" ref="table">
                <div style={{ float: 'left' }}>
                    <div className="idTable">{this.props.id}</div>
                    {this.tableImg()}
                </div>
                <div className="tables-selection" ref='selection'>
                    <li className="select select-add" id="selection-addTable" onClick={this.props.addFood}>
                        <NavLink to={this.urlAddFood}>
                            <i className="fa fa-plus" aria-hidden="true" style={{ color: 'green', float: 'left', marginTop: '5px' }}></i>
                            <div>Gọi món</div>
                        </NavLink>
                    </li>
                    <li className="select select-change"onClick={this.changeTable()} id="selection-changeTable">
                        <div>
                            <i className="fa fa-refresh" aria-hidden="true" style={{ color: 'blue', float: 'left', marginTop: '5px' }}></i>
                            <div className="txtChuyenBan">Chuyển bàn</div>
                        </div>
                    </li>
                    <li className="select select-payment" id="selection-Payment" onClick={this.props.payment}>
                        <NavLink to="/dashboard/tables/payment" >
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