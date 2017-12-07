import React, { Component } from 'react';
import {TableRow, TableRowColumn } from 'material-ui/Table';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const styles = {
	icon: {
		color: '#FFFFFF'
	}
}

class OrderBookItem extends Component {
	render() {
		let formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: this.props.currency,
			minimumFractionDigits: 2
		});

		rowColor = "#757575"
		
		if (this.props.order.type == "Buy") {
			rowColor = "#81C784"
		} else if (this.props.order.type == "Sell") {
			rowColor = "#EF9A9A";
		}

		var style = { 
			color: '#FFFFFF',
			backgroundColor: rowColor
	  	};

		return (
			<TableRow style = {style} >
				<TableRowColumn>{this.props.order.market}</TableRowColumn>
				<TableRowColumn>{this.props.order.type}</TableRowColumn>
				<TableRowColumn>{this.props.order.id}</TableRowColumn>
				<TableRowColumn>{this.props.order.price}</TableRowColumn>
				<TableRowColumn>{this.props.order.quantity}</TableRowColumn>
				<TableRowColumn>{this.props.order.total}</TableRowColumn>
			</TableRow>
		);
	}
}

export default OrderBookItem;