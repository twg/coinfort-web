import React, { Component } from 'react';

import TransactionList from '../components/TransactionList'
import ToggleDisplay from 'react-toggle-display';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '50px',
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		height: '60px'
	},
	icon: {
		width: '40px',
		height: '40px',
		margin: 'auto',
		marginRight: '10px',
	},
	header: {
		color: '#424242',
		fontSize: '40px',
		margin: 'auto',
		marginBottom: 'auto'
	},
	summaryContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: 'auto',
		marginTop: '60px',
		width: '82.5%',
		justifyContent: 'space-around',
		backgroundColor: '#FAFAFA',
		border: '1px solid  rgba(97, 97, 97, .1)',
		borderRadius: "2px"
	},
	summaryBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '30px',
		marginBottom: '30px'
	},
	summaryBoxTitle: {
		fontSize: '13px',
		fontWeight: 100,
		margin: '0 auto',
		color: '#42424280',
	},
	summaryBoxSubtitle: {
		fontSize: '22px',
		margin: '0 auto',
		marginTop: '15px'
	}
}

var localConversionValue = "";

class CoinOverview extends Component {
	constructor() {
		super();
		this.state = {
			allTransactions:[],
			updateChart:false,
			holdings:0.00,
			marketValue: 0.00,
			profitLoss: 0.00,
			netCost: 0.00
		}
	}

	componentWillMount() {
		//this.loadLocalFile();
	}

	componentWillReceiveProps(props) {
		localConversionValue = props.conversionValue;

		if (props.coin.symbol in this.props.fileTransactions) {
			this.generateSummary(this.props.fileTransactions[props.coin.symbol]);
		} else {
			this.setState({
				allTransactions: [],
				updateChart:true,
				holdings: 0.00,
				marketValue: 0.00,
				profitLoss: 0.00,
				netCost: 0.00,
			});
		}
	}

	createNewLocalFile() {
		console.log("Creating file");
        this.setState({
			allTransactions: [],
			holdings: 0.00,
			marketValue: 0.00,
			profitLoss: 0.00,
			netCost: 0.00
		});

		this.saveLocalFile(JSON.stringify([]));
	}
	
	saveLocalFile(contents) {
		console.log("Putting file");
        blockstack.putFile("/transactions.json", contents, true)
        .then(() => {
			console.log("Success putting file");
			/*
            this.setState({
                saveButtonText: 'Save',
                saveButtonDisabled: false
            });*/
        }).catch((e) => {
		  console.log("Error putting file", e);
		  /*
          this.setState({
            saveButtonText: 'Save',
            saveButtonDisabled: false
          });*/
        });
    }

	handleTransactions(transactions) {
		this.generateSummary(transactions);

		this.props.fileTransactions[this.props.coin.symbol] = transactions;

		this.props.updateMainList();

		console.log ("Saving file transactions", this.props.fileTransactions);

		//this.saveLocalFile(JSON.stringify(fileTransactions));
	}

	generateSummary(transactions) {
		let totalHoldings = 0.00;
		let totalCost = 0.0
		
		transactions.map (transaction => {
			if (transaction.type == "Buy") {
				totalHoldings += parseFloat(transaction.quantity);
				totalCost += parseFloat(transaction.quantity) * parseFloat(transaction.price)
			} else {
				totalHoldings -= parseFloat(transaction.quantity);
				totalCost -= parseFloat(transaction.quantity) * parseFloat(transaction.price)
			}
		});
				
		let marketValue = totalHoldings * parseFloat(localConversionValue);
		let profitLossValue = marketValue - totalCost;

		this.setState({
			allTransactions: transactions,
			updateChart:true,
			holdings: totalHoldings.toString(),
			marketValue: marketValue.toString(),
			profitLoss: profitLossValue,
			netCost: totalCost.toString()
		});
	}

	render() {
		let formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: this.props.currency,
			minimumFractionDigits: 2
		});

		return (
			<div style = {styles.root}>
				<div style = {styles.headerContainer}>
					<img style = {styles.icon} src= {this.props.coin.imageUrl + "?width=80"} className = "img-responsive" />
					<h1 style={styles.header}>{this.props.coin.name}</h1>
				</div>
				<div style = {styles.summaryContainer}>
					<div style = {styles.summaryBox}>
						<h1 style = {styles.summaryBoxTitle}>1 {this.props.coin.symbol}</h1>
						<h1 style = {styles.summaryBoxSubtitle}>{formatter.format(localConversionValue)}</h1>
					</div>
					<div style = {styles.summaryBox}>
					 	<h1 style = {styles.summaryBoxTitle}>Holdings</h1>
						<h1 style = {styles.summaryBoxSubtitle}>{this.state.holdings}</h1>
					</div>
					<div style = {styles.summaryBox}>
						<h1 style = {styles.summaryBoxTitle}>Market Value</h1>
						<h1 style = {styles.summaryBoxSubtitle}>{formatter.format(this.state.marketValue)}</h1>
					</div>
					<div style = {styles.summaryBox}>
						<h1 style = {styles.summaryBoxTitle}>Profit/Loss</h1>
						<h1 style = {styles.summaryBoxSubtitle}>{formatter.format(this.state.profitLoss)}</h1>
					</div>
					<div style = {styles.summaryBox}>
						<h1 style = {styles.summaryBoxTitle}>Net Cost</h1>
						<h1 style = {styles.summaryBoxSubtitle}>{formatter.format(this.state.netCost)}</h1>
					</div>
				</div>
				<TransactionList handleTransactions = {this.handleTransactions.bind(this)} transactions = {this.state.allTransactions} coinName = {this.props.coin.name} currency = {this.props.currency}/>
			</div>
		);
	}
}
  
  export default CoinOverview;