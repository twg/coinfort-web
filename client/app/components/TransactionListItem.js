import React, { Component } from 'react';
import {TableRow, TableRowColumn } from 'material-ui/Table';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const styles = {
	icon: {
		color: '#FFFFFF'
	}
}

class TransactionListItem extends Component {
	handleDelete() {
		 this.props.deleteTransaction(this.props.transaction);
	}

	render() {
		let formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: this.props.currency,
			minimumFractionDigits: 2
		});

		var rowColor = "#EF9A9A";
		
		if (this.props.transaction.type == "Buy") {
			rowColor = "#81C784"
		} 

		var style = { 
			color: '#FFFFFF',
			backgroundColor: rowColor
	  };

		return (	
			<TableRow style = {style}>
				<TableRowColumn>{this.props.transaction.date}</TableRowColumn>
				<TableRowColumn>{this.props.transaction.type}</TableRowColumn>
				<TableRowColumn>{this.props.transaction.quantity}</TableRowColumn>
				<TableRowColumn>{formatter.format(this.props.transaction.price)}</TableRowColumn>
				<TableRowColumn>{formatter.format(parseFloat(this.props.transaction.quantity) * parseFloat(this.props.transaction.price))}</TableRowColumn>
				<TableRowColumn><ActionDelete style = {styles.icon} onClick={this.handleDelete.bind(this)}/></TableRowColumn>
			</TableRow>
		);
	}
}

export default TransactionListItem;