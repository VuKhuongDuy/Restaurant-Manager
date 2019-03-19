import React, { Component } from 'react';

class ATable extends Component {
    showListTable(){
        if(this.props.status=="false")
            return <img src="./img/table-no.png" alt="table" className="home-room-img" />
        else if(this.props.status == "true")
            return <img src="./img/table-havePeo.png" alt="table" className="home-room-img" />
    }

    render() {
        return (
            <div className="home-table">
                <div style={{ float: 'left' }}>
                    <div className="idTable">{this.props.id}</div> 
                    {this.showListTable()}
                </div>
                <div className="tables-selection">
                    <li className="select select-add" id="selection-addTable">
                        <i className="fa fa-plus" aria-hidden="true" style={{ color: 'green', float: 'left', marginTop: '5px' }}></i>
                        <div>Gọi món</div>
                    </li>
                    <li className="select  select-change" id="selection-changeTable">
                        <div>
                            <i className="fa fa-refresh" aria-hidden="true" style={{ color: 'blue', float: 'left', marginTop: '5px' }}></i>
                            <div className="txtChuyenBan">Chuyển bàn</div>
                        </div>
                    </li>
                    <li className="select select-payment" id="selection-Payment">
                        <i className="fa fa-credit-card-alt" aria-hidden="true" style={{ color: 'red', float: 'left', marginTop: '5px' }}></i>
                        <div>Thanh toán</div>
                    </li>
                </div>
            </div>
       );
    }
}       

export default ATable