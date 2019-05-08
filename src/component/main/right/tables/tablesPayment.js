import React, { Component } from 'react'

export default class TablesPayment extends Component {
    constructor(props) {
        super(props);
        this.loadData();
        var x = new Date();
        this.today = x.getDate() + "/" + x.getMonth() + "/" + x.getFullYear();
        this.status = 'notempty'
        this.state = {
            reRender: 1
        }
    }

    reRender(){
        this.setState({
            reRender:2
        })
    }

    init() {
        this.foods = [];
        this.totalPrice = 0
        this.id_table = this.props.match.params.id;
    }

    componentDidMount() {
        this.btnPayment = this.refs.btnPayment;
        this.txtTongTien = this.refs.TongTien;
    }

    loadData() {
        this.init();
        const url = "http://localhost:3001/dashboard/tables/payment/" + this.id_table;
        fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                data.listFood.map((value, key) => {
                    this.foods.push(value);
                })
                this.status = data.status;
                this.reRender()
            })
    }

    post(){
        const data = {
            totalPrice:this.totalPrice
        }
        var url ='http://localhost:3001/dashboard/tables/payment/'+this.id_table;
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(data )
        })
    }

    clickPayment() {
        if(this.status === 'notempty'){
            alert('Đã thanh toán hóa đơn ở bàn số'+  this.id_table + 'số tiền là: '+this.totalPrice+'\n \
            Bàn số '+this.id_table+' trống');
            this.post();
        }else{
            alert('Bàn trống, không có gì để thanh toán')
        }
    }

    renderFoods() {
        return (
            this.foods.map((value, key) => {
                this.totalPrice += Number(value.price)
                return (
                    <tr key={key} >
                        <td>{value.food_name}</td>
                        <td>{value.food_count}</td>
                        <td>{value.price} đ</td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <div id="tables-payment" className="form-Payment" ref="form_Payment">
                <img src="../../../img/bill.png" alt='bill' className="img-bill" />
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
                        <div className="detail-txtIDTable">{this.id_table}</div>
                    </div>
                    <div className="table-detail-menu">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Tên món</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                                {
                                    this.renderFoods()
                                }
                            </tbody>
                        </table>
                    </div>
                    <div id="tongtien" style={{ marginTop: '10px' }}>
                        <div id="lblTongTien" style={{ float: "left", marginRight: '290px', fontWeight: 'bold', fontSize: '20px' }}>Tổng tiền</div>
                        <div ref="TongTien" id="txtTongTien">{this.totalPrice} đ</div>
                    </div>
                    <button type="button" className="btn btn-success" ref="btnPayment" onClick={this.clickPayment.bind(this)}>Thanh toán</button>
                </div>
            </div>
        )
    }
}