import React, { Component } from 'react'

export default class TablesPayment extends Component {
    constructor(props){
        super(props);

        var x = new Date();
        this.today = x.getDate()+"/"+x.getMonth()+"/"+x.getFullYear();
    }

    componentDidMount() {
        this.btnPayment = this.refs.btnPayment;
        this.txtTongTien = this.refs.TongTien;

        this.clickPayment();
    }

    loadData(){
        
    }

    clickPayment() {
        var self = this;
        this.btnPayment.addEventListener('click', function () {

            alert('Đã thanh toán số tiền: ' + self.txtTongTien.innerHTML);
        });
    }

    render() {
        return (
            <div id="tables-payment" className="form-Payment" ref="form_Payment">
                <img src="../../img/bill.png" alt='bill' className="img-bill" />
                <div id="bill-detail">
                    <div className="title">
                        Hóa đơn
                    </div>
                    <div className="date">
                        <i className="fa fa-calendar-check-o" aria-hidden="true" style={{ position: "absolute", left: "3px", marginTop: '12px', color: '#1f67af' }}></i>
                        <div className="lblDate">Ngày tháng</div>
                        <div className="txtDate">{this.today}</div>
                    </div>
                    <div className="idTable">
                        <i className="fa fa-key" aria-hidden="true" style={{ position: "absolute", left: "3px", marginTop: '12px', color: '#b2ad9b' }}></i>
                        <div className="lblIDTable">ID bàn</div>
                        <div className="detail-txtIDTable">{this.props.id_table}</div>
                    </div>
                    <div className="table-detail-menu">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Tên món</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="tongtien" style={{ marginTop: '10px' }}>
                        <div id="lblTongTien" style={{ float: "left", marginRight: '350px', fontWeight: 'bold', fontSize: '20px' }}>Tổng tiền</div>
                        <div ref="TongTien" id="txtTongTien">12312312</div>
                    </div>
                    <button type="button" className="btn btn-success" ref="btnPayment">Thanh toán</button>
                </div>
            </div>
        )
    }
}