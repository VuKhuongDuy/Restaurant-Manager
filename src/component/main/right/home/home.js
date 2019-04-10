import React, { Component } from 'react'
import ATable from './ATable'

// export const wrapper = (props) => {
//     return this.props.data.map((value, key) => (
//         <ATable id={value.id} status={value.statusNow} key={key} />
//     ))
// }

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.tables = [];
        this.revenue = []
        this.rank_dish_name = [];
        this.rank_dish_count = [];
        this.rota = [];
        this.state = {
            isLoading: 'true'
        }
        this.loadData();
    }

    componentDidMount() {
        console.log('home-didmount');
    }

    loadData() {
        const url = "http://localhost:3001/dashboard";
        fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer", // no-referrer, *client
        }).then(response => response.json())
            .then(data => {

                data[0].map((value, key) => {
                    this.tables.push(value);
                });
                data[1].map((value, key) => {
                    this.revenue.push(value.revenue);
                });

                data[2].map((value, key) => {
                    this.rank_dish_name.push(value.food_name);
                    this.rank_dish_count.push(value.soluong);
                })

                data[3].map((value, key) => {
                    this.rota.push(value);
                })

                this.setState({
                    isLoading: 'false'
                });
            });
    }

    renderTable() {
        return (
            <div className="home-element" ref="homeroom" id="home-room">
                {
                    this.tables.map((value, key) => {
                        return (
                            <ATable id={value.id} status={value.status} key={key} />
                        )
                    })
                }
            </div>
        )
    }

    renderRota() {
        return (
            this.rota.map((value, key) => {
                return (
                    <tr key={key}>
                        <td>{value.name}</td>
                        <td>{value.working}</td>
                        <td>{value.countleave}</td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <div id="home">
                    {this.state.isLoading === "false" ? this.renderTable() : <div>LOADING...</div>}
                    <div className="bar">
                    </div>
                    <div className="home-element">
                        <div id="home-thongke">
                            <div className="home-element-header" id="thongke-header" style={{ fontWeight: "bold" }}>
                                <i className="fa fa-bar-chart" aria-hidden="true" style={{ marginRight: '5px' }} />
                                Thống kê
                            </div>
                            <div className="thongke-doanhthu">
                                <div>
                                    <table className="thongke-table" id="tblDoanhthu">
                                        <tbody>
                                            <tr style={{ fontSize: '17px', lineHeight: '40px' }}>
                                                <th>
                                                    <i className="fa fa-money" aria-hidden="true" style={{ marginRight: '4px', color: 'gold' }}></i>
                                                    Doanh thu
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>Hôm nay: </td>
                                                <td>
                                                    {this.revenue[0]} đ</td>
                                            </tr>
                                            <tr>
                                                <td>Tháng này: </td>
                                                <td>{this.revenue[1]} đ</td>
                                            </tr>
                                            <tr>
                                                <td>Năm nay: </td>
                                                <td>{this.revenue[2]} đ</td>
                                            </tr>
                                        </tbody></table>
                                </div>
                            </div>
                            <div className="thongke-xephangmonan">
                                <table className="thongke-table" id="tblXephang">
                                    <tbody>
                                        <tr style={{ lineHeight: '40px' }}>
                                            <th>
                                                <i className="fa fa-filter" aria-hidden="true" style={{ color: 'red', marginRight: '3px' }}></i>
                                                Những món bán chạy nhất
                                            </th>
                                        </tr>
                                        <tr style={{ backgroundColor: 'gold' }}>
                                            <td>
                                                {this.rank_dish_name[0]}</td>
                                            <td>
                                                <i className="fa fa-trophy" aria-hidden="true" style={{ float: 'left' }}></i>
                                                {this.rank_dish_count[0]}
                                            </td>
                                        </tr>
                                        <tr style={{ backgroundColor: 'silver' }}>
                                            <td>{this.rank_dish_name[1]}</td>
                                            <td>{this.rank_dish_count[1]}</td>
                                        </tr>
                                        <tr style={{ backgroundColor: '#965521' }}>
                                            <td>{this.rank_dish_name[2]}</td>
                                            <td>{this.rank_dish_count[2]}</td>
                                        </tr>
                                    </tbody></table>
                            </div>
                        </div>
                        <div id="home-lichlamviec">
                            <div className="home-element-header" id="lichlamviec-header" style={{ fontWeight: "bold" }}>
                                <i className="fa fa-calendar" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                                Nhân viên đang làm
                            </div>
                            <div id="lichlamviec-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Tên nhân viên</th>
                                            <th>Vai trò</th>
                                            <th>Nghỉ/Tháng</th>
                                        </tr>
                                        {this.state.isLoading === "false" ? this.renderRota() : <tr></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}