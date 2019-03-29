import React, { Component } from 'react'
import ATable from './ATable'
import db from '../Json/table.json'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = { posts: []};
    }

    componentDidMount() {
        const url = "http://localhost:3001/dashboard";
        const response = fetch(url, {
            method: 'POST',
            body: "body",
            headers: {
                Accept: 'application/json',
                "Content-Type": "text/plain"
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({posts: json.sex});
                })
            }
        })
    }

    render() {
        return (<div>
            Hello World
            <ul>
                    <h2>{this.state.posts}</h2>
            </ul>
        </div>);
    }
    
    // render() {
    //     return (
    //         <div id="home">
    //             {
    //                 this.state.posts.map(post => <li>
    //                     <h2>{post.id}</h2>
    //                 </li>)
    //             }
    //             <div className="home-element" ref="homeroom" id="home-room">
    //             {
    //                     db.map((value, key) => {
    //                         return(
    //                             <ATable id={value.id} status={value.status} key={key} />
    //                         )
    //                     })
    //             }
    //             </div>
    //             <div className="bar"></div>
    //             <div className="home-element">
    //                 <div id="home-thongke">
    //                     <div className="home-element-header" id="thongke-header" style={{fontWeight:"bold"}}>
    //                         <i className="fa fa-bar-chart" aria-hidden="true" style={{ marginRight: '5px' }} />
    //                         Thống kê
    //                     </div>
    //                     <div className="thongke-doanhthu">
    //                         <div>
    //                             <table className="thongke-table" id="tblDoanhthu">
    //                                 <tbody>
    //                                     <tr style={{ fontSize: '17px', lineHeight: '40px' }}>
    //                                         <th>
    //                                             <i className="fa fa-money" aria-hidden="true" style={{ marginRight: '4px', color: 'gold' }}></i>
    //                                             Doanh thu
    //                                         </th>
    //                                     </tr>
    //                                     <tr>
    //                                         <td>Hôm nay: </td>
    //                                         <td>12</td>
    //                                     </tr>
    //                                     <tr>
    //                                         <td>Tuần trước: </td>
    //                                         <td>13</td>
    //                                     </tr>
    //                                     <tr>
    //                                         <td>Tháng trước: </td>
    //                                         <td>13</td>
    //                                     </tr>
    //                                 </tbody></table>
    //                         </div>
    //                     </div>
    //                     <div className="thongke-xephangmonan">
    //                         <table className="thongke-table" id="tblXephang">
    //                             <tbody>
    //                                 <tr style={{ lineHeight: '40px' }}>
    //                                     <th>
    //                                         <i className="fa fa-filter" aria-hidden="true" style={{ color: 'red', marginRight: '3px' }}></i>
    //                                         Những món bán chạy nhất
    //                                     </th>
    //                                 </tr>
    //                                 <tr style={{ backgroundColor: 'gold' }}>
    //                                     <td>Món 1</td>
    //                                     <td>
    //                                         <i className="fa fa-trophy" aria-hidden="true" style={{float:'left'}}></i>
    //                                         1
    //                                     </td>
    //                                 </tr>
    //                                 <tr style={{ backgroundColor: 'silver' }}>
    //                                     <td>Món 2</td>
    //                                     <td>1</td>
    //                                 </tr>
    //                                 <tr style={{ backgroundColor: '#965521' }}>
    //                                     <td>Món 3</td>
    //                                     <td>1</td>
    //                                 </tr>
    //                             </tbody></table>
    //                     </div>
    //                 </div>
    //                 <div id="home-lichlamviec">
    //                     <div className="home-element-header" id="lichlamviec-header" style={{ fontWeight: "bold" }}>
    //                         <i className="fa fa-calendar" aria-hidden="true" style={{ marginRight: '5px' }}></i>
    //                         Nhân viên trực
    //                     </div>
    //                     <div id="lichlamviec-table">
    //                         <table>
    //                             <tbody>
    //                                 <tr>
    //                                     <th>Mã nhân viên</th>
    //                                     <th>Tên</th>
    //                                     <th>Vai trò</th>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                 </tr><tr>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                     <td>ten1</td>
    //                                 </tr>

    //                             </tbody>
    //                         </table>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
}

