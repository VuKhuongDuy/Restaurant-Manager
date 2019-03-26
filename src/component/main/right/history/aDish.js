import React, { Component } from 'react';

class aDish extends Component {
    render() {
        return (
            <tr>
                <td>this.props.name</td>
                <td>this.props.price</td>
                <td>this.props.count</td>
                <td>this.props.cost</td>
            </tr>
        );
    }
}

export default aDish;