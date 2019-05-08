import React, { Component } from 'react';
import ABill from './aBill.js';
import ADish from './aDish';

class history extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restart: 1,
            id_bill:0
        }
        this.init();
    }

    init() {
        this.listBill = [];
        this.listBillDetail = [];
        this.listBillWillLoaded = []
        this.listBillDetailWillLoaded = []
        this.loadData();
    }

    loadData() {
        fetch('http://localhost:3001/dashboard/history', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        }).then(respone => respone.json())
            .then(data => {
                data[0].map((value, key) => {
                    this.listBill.push(value);
                })
                this.listBillWillLoaded = this.listBill;
                data[1].map((value,key)=>{
                    this.listBillDetail.push(value);
                })
                this.reRender()
            })
    }

    setIDBillDetail(id){
        this.setState({
            id_bill : id
        })
    }

    renderBillDetail() {
        return this.listBillDetail.map((value,key)=>{
            if(value.id == this.state.id_bill){
                return <ADish food_name = {value.food_name} food_price={value.food_price} food_count = {value.food_count} total_cost = {value.total_cost} key={key}/>
            }
        })
    }

    clickSearch() {
        let btnIdTable = this.refs.ckbIDTable;
        let btnWithDate = this.refs.ckbDate;
        let idS = this.refs.nbmID.value;
        let dateS = this.refs.date.value;
        this.listBillWillLoaded = this.listBill

        if (btnIdTable.checked == true) {
            if (idS.length <= 0)
                alert('Hãy nhập id bàn bạn muốn tìm!')
            else {
                let arr = []
                this.listBillWillLoaded.map((value, key) => {
                    if(value.id_table == idS){
                        arr.push(value)
                    }
                })
                this.listBillWillLoaded = arr;
            }
        }
        if(btnWithDate.checked == true){
            if(dateS.length <= 0)
                alert('Hãy nhập ngày bạn muốn tìm!')
            else{
                let arr = []
                this.listBillWillLoaded.map((value,key)=>{
                    let strDate = this.DateToString(value.check_date);
                    if(strDate === dateS){
                        arr.push(value)
                    }
                })
                this.listBillWillLoaded = arr;
            }
        }
        this.reRender();
    }

    DateToString(date){
        let newDate =new Date(date);
        let aDate = new Date(newDate.getTime()+24*60*60*1000)
        let str = JSON.stringify(aDate);
        let index = str.indexOf('T');
        let strDate = str.substring(1,index);
        return strDate;
    }

    clearClick() {
        let tr = this.refs.listBill.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {
            tr[i].style.backgroundColor = "white";
        }
    }

    showListBill() {
        return this.listBillWillLoaded.map((value, key) => {
            const strDate = this.DateToString(value.check_date);
            return (
                <ABill key={key} setIDBillDetail={this.setIDBillDetail.bind(this)} clearClick={this.clearClick.bind(this)} id={value.id} idTable={value.id_table} date={strDate} cost={value.total_cost} />
            )
        });
    }

    reRender() {
        this.setState({
            restart: 2
        })
    }

    render() {
        return (
            <div id="history">
                <div id="history-optionSearch">
                    <div className="partOption ckbHistory">
                        <input type="checkbox" ref="ckbIDTable" id="ckbIDTable" style={{ width: "24px", height: "24px" }} name="Search By IDTable" value="IDTable" />
                        <input type="checkbox" ref="ckbDate" id="ckbDate" style={{ width: "24px", height: "24px" }} name="Search By date" value="date" />
                    </div>
                    <div className="partOption lblHistory">
                        <label htmlFor="ckbIDTable" style={{ width: "100%", height: "28px", textAlign: "left" }}>Theo bàn</label>
                        <label htmlFor="ckbDate" style={{ width: "100%", height: "28px", textAlign: "left" }}>Theo ngày tháng</label>
                    </div>
                    <div className="partOption inputHistory">
                        <input type="number" ref="nbmID" className="inputHis nbmHistory" style={{ width: "100%", height: "28px", textAlign: "left" }} placeholder="Chọn bàn" name="quantity" min={0} max={10000} />
                        <input type="date" ref="date" className="inputHis dateHistory" style={{ width: "100%", height: "28px", textAlign: "left" }} name="date" />
                    </div>
                    <button className="partOption btn btn-success" ref="btnsearch" onClick={this.clickSearch.bind(this)}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
                <div id="history-ListBill" ref="listBill">
                    <table>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>ID Bàn</th>
                                <th>Ngày thanh toán</th>
                                <th>Tiền thanh toán</th>
                            </tr>
                            {this.showListBill()}
                        </tfoot>
                    </table>
                </div>
                <div id="history-DetailBill">
                    <table>
                        <tfoot>
                            <tr>
                                <th>Món</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </tr>
                            {this.renderBillDetail()}
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default history;