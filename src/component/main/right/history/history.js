import React, { Component } from 'react';
import dbBill from '../Json/bill.json'
import dbBillDetail from '../Json/billDetail.json';
import ABill from './aBill.js'

class history extends Component {
    componentDidMount(){
        this.showListBill();
    }

    showBillDetail(id){
        dbBillDetail.map((value,key)=>{
            if(value.id == id){

            }
        })
    }

    clickSearch(){
        
    }

    clearClick(){
        let tr = this.refs.listBill.getElementsByTagName('tr');
        for(let i=0;i<tr.length;i++){
            console.log(i);
            tr[i].style.backgroundColor = "white";
        }
    }

    showListBill(){
        return dbBill.map((value,key)=>{
            return(
                <ABill key={key} showBillDetail={this.showBillDetail.bind(this)} clearClick={this.clearClick.bind(this)} id={value.id} idTable={value.idTable} date={value.date} cost={value.cost}/>
            )
        });
    }

    render() {
        return (
            <div id="history">
                <div id="history-optionSearch">
                    <div className="partOption ckbHistory">
                        <input type="checkbox" ref="ckbIDTable" id="ckbIDTable" style={{width: "24px",height:"24px"}} name="Search By IDTable" value="IDTable"/>
                        <input type="checkbox" ref="ckbDate" id="ckbDate" style={{ width: "24px", height: "24px" }} name="Search By date" value="date"/>
                    </div>
                    <div className="partOption lblHistory">
                        <label htmlFor="ckbIDTable" style={{width:"100%",height:"28px",textAlign:"left"}}>Theo bàn</label> 
                        <label htmlFor="ckbDate" style={{ width: "100%", height: "28px", textAlign: "left" }}>Theo ngày tháng</label>
                    </div>
                    <div className="partOption inputHistory">
                        <input type="number" className="inputHis nbmHistory" style={{ width: "100%", height: "28px", textAlign: "left" }} placeholder="Chọn bàn" name="quantity" min={0} max={10000}/>
                        <input type="date" className="inputHis dateHistory" style={{ width: "100%", height: "28px", textAlign: "left" }} name="date"/>
                    </div>
                    <button className="partOption btn btn-success" ref="btnsearch" onClick={this.clickSearch}>
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
                            {
                                this.showListBill()
                            }
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
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default history;