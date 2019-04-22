import React, { Component } from 'react';

export default class ABill extends Component {
    click(){
        this.props.clearClick();
        let tr = this.refs.tr;
        tr.style.backgroundColor = "#e6f2ff";
        this.props.setIDBillDetail(this.props.id);
    }

    render() {
        return (
            <tr ref="tr" onClick={this.click.bind(this)}>
                <td>{this.props.id}</td>
                <td>{this.props.idTable}</td>
                <td>{this.props.date}</td>
                <td>{this.props.cost}</td>
            </tr>
        );
    }
}
