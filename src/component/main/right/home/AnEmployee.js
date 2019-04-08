import React, { Component } from 'react';

class AnEmployee extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.working}</td>
                <td>{this.props.countleave}</td>
            </tr>
        );
    }
}

export default AnEmployee;