import React, { Component } from 'react'

export default class TablesAddFood extends Component {
    constructor(props) {
        super(props);

        this.init();
        this.state = {
            isLoading: "true",
            reRender: 'false',
        }

        this.loadData();
    }

    init() {
        this.foods = [];
        this.foodOrders = [];
        this.id = this.props.match.params.id;
    }

    componentDidMount() {
        this.tablesPayment = document.getElementById('tables-addFood');
        this.cbxListFood = this.refs.cbxListFood;
        this.nmbDishCount = this.refs.dishCount;
        this.btnAddFood = this.refs.btnAddFood;
        this.tableDetailMenu = this.refs.tableDetailMenu;
        this.tbody = this.tableDetailMenu.getElementsByTagName('tbody');
    }

    loadData() {
        this.init();
        const data = {
            name: 1
        }
        const url = "http://localhost:3001/dashboard/tables/addfood";
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
                data.map((value, key) => {
                    this.foods.push(value);
                })
                this.reRender();
            })
    }

    postData(url, data) {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    clickAcceptAddFood() {
        var data = this.foodOrders
        var url = "http://localhost:3001/dashboard/tables/addfood/" + this.id;
        this.postData(url, data);
    }

    clickOrderFood() {
        var id_food = 0;

        this.foods.map((value, key) => {
            if (value.food_name === this.cbxListFood.value)
                id_food = value.id
        })

        var aFoodOrder = {
            id_food: id_food,
            food_name: this.cbxListFood.value,
            count: this.nmbDishCount.value
        }
        this.foodOrders.push(aFoodOrder);
        this.reRender();
    }

    reRender() {
        this.setState({
            isLoading: "false"
        })
    }

    renderfoods() {
        console.log(this.foods);
        return this.foods.map((value, key) => {
            return <option key={key}>{value.food_name}</option>
        })
    }

    renderfoodOrders() {

        return (
            this.foodOrders.map((value, key) => {
                return (
                    <tr key={key}>
                        <td>{value.food_name}</td>
                        <td>{value.count}</td>
                    </tr>
                )
            })
        )
    }

    render() {
        { console.log('table add food render') }
        return (
            <div id="tables-addFood" className="form-AddFood">
                <div className="tables-selection-header">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" style={{ marginRight: "5px" }}></i>
                    Gọi món</div>
                <div className="tables-selection-img">
                    <img src="../../../img/staff.png" alt="staff" style={{ width: " 400px", height: "500px" }} />
                </div>
                <img src="../../../img/notebook.png" alt="notebook" style={{ width: "70%", height: "100%", position: "absolute", right: "120px", zIndex: '-1' }}></img>
                <div className="tables-selection-main">
                    <div className="addFood-select">
                        <select id="cbxListFood" ref="cbxListFood">
                            {
                                this.state.isLoading === "false" ? this.renderfoods() : <option></option>
                            }
                        </select>
                        <input type="number" name="quantity" min={0} max={100} placeholder="Số lượng" id="dishCount" ref="dishCount" />
                        <button type="button" className="btn btn-success" ref="btnAddFood" onClick={this.clickOrderFood.bind(this)}>Gọi</button>
                    </div>
                    <div className="addFood-listFood">
                        <table className="table-detail-menu" ref="tableDetailMenu">
                            <tbody>
                                <tr>
                                    <th>Món</th>
                                    <th>Số lượng</th>
                                </tr>
                                {
                                    this.renderfoodOrders()
                                }
                            </tbody>
                        </table>
                    </div>
                    <button type="button" id="btnAcceptAddFood" className="btn btn-success" ref="btnAccept" onClick={this.clickAcceptAddFood.bind(this)}>
                        <i className="fa fa-check" aria-hidden="true" style={{ marginRight: "4px" }}></i>Xác nhận
                    </button>
                </div>
            </div>
        )
    }
}