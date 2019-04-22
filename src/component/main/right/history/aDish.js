import React, { Component } from 'react';

class aDish extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.food_name}</td>
                <td>{this.props.food_price}</td>
                <td>{this.props.food_count}</td>
                <td>{this.props.total_cost}</td>
            </tr>
        );
    }
}

export default aDish;