import React, { Component } from 'react';

class ATable extends Component {
    showListTable(){
        if (this.props.status === "true")
            return <img src='./img/table-havePeo.png' alt="tableimg" className="home-room-img" />
        else if (this.props.status === "false")
            return <img src='./img/table-no.png' alt="tableimg" className="home-room-img" />
    }

    render() {
        return (
            <div className="home-table">
                <div className="idTable">{this.props.id}</div>
                <div> {this.showListTable()} </div>
            </div>
        );
    }
}

export default ATable;