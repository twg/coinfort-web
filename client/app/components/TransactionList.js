import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Moment from 'moment';
import UUID from 'uuid/v1';

import TransactionListItem from './TransactionListItem';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: 'auto',
		width: '82.5%',
		marginTop: '50px'
	},
	dialog: {
		width: '300px',
		height: '600px',
	},
	textField: {
		fontSize: '15px',
		color: '#424242',
	},
	label: {
		textTransform: 'none',
	},
	listContainer: {
		width: '100%',
		borderTop: '1px solid  rgba(97, 97, 97, .1)',
		borderLeft: '1px solid  rgba(97, 97, 97, .1)',
		borderRight: '1px solid  rgba(97, 97, 97, .1)',
		borderRadius: '2px',
		marginTop: '40px',
		marginBottom: '40px'
	},
	headerContainer: { 
		display: 'flex',
		flexDirection: 'row',
		height: '80px',
		backgroundColor: '#FAFAFA',
		justifyContent: 'space-between'
	},
	header: {
		marginTop: 'auto',
		marginBottom: 'auto',
		marginLeft: '15px',
		textAlign: 'center',
		color: '#424242',
		fontSize: '23px'
	},
	button: {
		marginTop: 'auto',
		marginBottom: 'auto',
		marginRight: '15px',
		width: '20%',
		height: '60%'
	},
	actionButtonLabel: {
		color: '#FFFFFF',
		textTransform: 'none',
		fontSize: '17px'
	},
	divider: {
		backgroundColor: '#EEEEEE',
		width: '100%'
	},
	table: {
		textTransform: 'none'
	},
	tableHeaderRow: {
		textTransform: 'none',
		borderBottom: '1px solid  rgba(97, 97, 97, .1)'
	},
	underlineStyleFocused: {
    	borderColor: '#424242'
  	},
	positiveStateLabel: {
		textTransform: 'none',
    	color: '#424242'
  	}
}

var selectedDate = null;

function Transaction(type, quantity, price, date) {
	this.id = UUID();
  	this.type = type;
  	this.quantity = quantity;
	this.price = price;
	this.date = date;
}

class TransactionList extends Component {
	constructor() {
		super();
			this.state = {
				open: false,
				buySellValue: 1,
				errorTextAmount: "",
				errorTextPrice: "",
				errorTextDate: "",
		}
	}

	handleOpen() {
		this.setState({open: true});
	}

	handleDateSelection(event, date) {
    selectedDate = date;
		this.setState({ errorTextDate: "" });
	}

	handleAmountOnChange(event) { 		
		if (event.target.value != "") {
			this.setState({ errorTextAmount: "" });
		}
	}

	handlePriceOnChange(event) { 
		if (event.target.value != "") {
			this.setState({ errorTextPrice: "" });
		}
	}

	handleSaveClose() {
		let hasError = false;

		if (this.refs.amount.getValue() == "") {
			this.setState({ errorTextAmount: 'This field is required.' });
			hasError = true;
		}

		if (this.refs.price.getValue() == "") {
			this.setState({ errorTextPrice: 'This field is required.' });
			hasError = true;
		}

		if (!selectedDate) {
			this.setState({ errorTextDate: 'This field is required.' });
			hasError = true;
		}

		if (hasError) {
			return;
		}

		this.setState({open: false});

		let type = this.state.buySellValue == 1 ? "Buy" : "Sell";

		let transaction = new Transaction(
			type, 
			this.refs.amount.getValue(), 
			this.refs.price.getValue(),
			Moment(selectedDate).format("MMM Do, YYYY")
		);

		this.props.transactions.push(transaction);

		this.props.handleTransactions(this.props.transactions);

		selectedDate = null;
	}

	handleCancelClose() {
		this.setState({open: false});
		this.setState({
			errorTextAmount: "", 
			errorTextPrice: "",
			errorTextDate: "" 
		});
	}

	handleBuySellSwitch(event, index, value) {
		this.setState({buySellValue: value});
	}

	handleDelete(transaction) {
		console.log(transaction);
		let index = this.props.transactions.findIndex(x => x.id === transaction.id);
		this.props.transactions.splice( index, 1 );

		this.props.handleTransactions(this.props.transactions);
	}

	render() {
		const actions = [
			<FlatButton
					label="CANCEL"
					primary={true}
					keyboardFocused={false}
					onClick={this.handleCancelClose.bind(this)}
			/>,
			<FlatButton
					labelStyle = {styles.positiveStateLabel}
					label="SAVE"
					primary={true}
					keyboardFocused={false}
					onClick={this.handleSaveClose.bind(this)}
			/>
		]; 

		this.transactions = this.props.transactions.map(transaction => {
			return (
				<TransactionListItem key = {transaction.id} transaction = {transaction} deleteTransaction = {this.handleDelete.bind(this)} currency = {this.props.currency} />
			);
		});

		return (
			<div style = {styles.root}>
				<div style = {styles.listContainer}>
					<div style = {styles.headerContainer}> 
						<h1 style = {styles.header}>Transaction History</h1>
						<FlatButton backgroundColor = "#424242" hoverColor = "#42424295" style = {styles.button} labelStyle = {styles.actionButtonLabel} label="Add Transaction" onClick={this.handleOpen.bind(this)} />
					</div>
					<Divider style = {styles.divider} />
					 <Table style = {styles.table}>
    					<TableHeader displaySelectAll = {false} adjustForCheckbox = {false} >
      					<TableRow style = {styles.tableHeaderRow}>
									<TableHeaderColumn>Date</TableHeaderColumn>
									<TableHeaderColumn>Buy/Sell</TableHeaderColumn>
									<TableHeaderColumn>Quantity</TableHeaderColumn>
									<TableHeaderColumn>Price</TableHeaderColumn>
									<TableHeaderColumn>Total</TableHeaderColumn>
									<TableHeaderColumn></TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody>
								{this.transactions}
							</TableBody>
 					 	</Table>
				</div>
				<Dialog 
					contentStyle = {styles.dialog}
					titleStyle = {styles.label}
					title={this.props.coinName}
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleCancelClose.bind(this)}>
				<SelectField 
					ref="transactionType"
					labelStyle = {styles.textField} 
					floatingLabelStyle = {styles.label}
					menuItemStyle = {styles.label}
					floatingLabelText="Type"
					value={this.state.buySellValue}
					onChange={this.handleBuySellSwitch.bind(this)}>
					<MenuItem value={1} primaryText="Buy" />
					<MenuItem value={2} primaryText="Sell" />
				</SelectField>
				<TextField
					ref="amount" 
					onChange = {this.handleAmountOnChange.bind(this)} 
					errorText = {this.state.errorTextAmount} 
					style = {styles.textField} 
					floatingLabelText="Amount" 
					floatingLabelFocusStyle={styles.positiveStateLabel} 
					underlineFocusStyle = {styles.underlineStyleFocused} />
				<TextField
					ref="price" 
					onChange = {this.handlePriceOnChange.bind(this)} 
					errorText = {this.state.errorTextPrice} 
					style = {styles.textField} 
					floatingLabelText="Coin Price" 
					floatingLabelFocusStyle={styles.positiveStateLabel} 
					underlineFocusStyle = {styles.underlineStyleFocused}/>
				<DatePicker 
					ref="date" 
					floatingLabelText = "Date" 
					errorText = {this.state.errorTextDate}
					onChange={this.handleDateSelection.bind(this)} 
					formatDate={(date) => Moment(date).format("MMM Do, YYYY")}/>
				</Dialog>
			</div>
		);
	}
}
  
export default TransactionList;