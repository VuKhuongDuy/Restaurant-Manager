import React, { Component } from 'react'

export default class TablesAddFood extends Component {
    constructor(props) {
        super(props);

        this.foods = [];
        this.state = {
            isLoading: "true"
        }
        this.loadData();
    }
    
    componentDidMount(){
        this.tablesPayment = document.getElementById('tables-addFood');
        this.cbxListFood = this.refs.cbxListFood;
        this.nmbDishCount = this.refs.dishCount;
        this.btnAddFood = this.refs.btnAddFood;
        this.tableDetailMenu = this.refs.tableDetailMenu;
        this.tbody = this.tableDetailMenu.getElementsByTagName('tbody');
        this.clickAddFood();
    }

    loadData(){
        const data = {
            name:1
        }

        const url = "http://localhost:3001/dashboard/tables/addfood/2";
        fetch(url,{
            method: "GET",
            mode:"cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json",
            },
            redirect:"follow",
            referrer:"no-referrer"
        }).then(response => response.json())
            .then(data=>{
                data[0].map((value,key)=>{
                    this.foods.push(value);
                })
                this.setState({
                    isLoading:"false"
                })
            })
    }

    clickAddFood(){
        var self = this;
        this.btnAddFood.addEventListener('click',function(){
            let newTr= document.createElement('tr');
            let TrFood = document.createElement('td');
            let TrNmb = document.createElement('td');
            TrFood.innerHTML = self.cbxListFood.value;
            TrNmb.innerHTML = self.nmbDishCount.value;
            newTr.appendChild(TrFood);
            newTr.appendChild(TrNmb);
            self.tbody[0].appendChild(newTr);
        })
    }

    renderlistfood(){
        console.log(this.foods);
        return this.foods.map((value,key)=>{
            return <option value={key}>{value.food_name}</option>
        })  
    }

    render() {
        return (
            <div id="tables-addFood" className="form-AddFood">
                <div className="tables-selection-header">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" style={{ marginRight: "5px"}}></i>
                Gọi món</div>
                <div className="tables-selection-img">
                    <img src="../../../img/staff.png" alt="staff" style={{width:" 400px", height:"500px"}}/>
                </div>
                <img src="../../../img/notebook.png" alt="notebook" style={{width: "70%", height:"100%", position:"absolute",right:"120px",zIndex:'-1'}}></img>
                <div className="tables-selection-main">
                    <div className="addFood-select">
                        <select id="cbxListFood" ref="cbxListFood">
                            {
                                this.state.isLoading === "false"?this.renderlistfood():<option></option>
                            }
                        </select>
                        <input type="number" name="quantity" min={0} max={100} placeholder="Số lượng" id="dishCount" ref="dishCount" />
                        <button type="button" className="btn btn-success" ref="btnAddFood">Gọi</button>
                    </div>
                    <div className="addFood-listFood">
                        <table className="table-detail-menu" ref="tableDetailMenu">
                            <tbody>
                                <tr>
                                    <th>Món</th>
                                    <th>Số lượng</th>
                                </tr>
                                <tr>
                                    <td>Món 1</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}