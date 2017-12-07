import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import RefreshIndicatorView from './RefreshIndicatorView';
import Chart from '../components/Chart';

import CoinOverview from '../components/CoinOverview';
import PortfolioCoinSearchBar from '../components/PortfolioCoinSearchBar';
import SelectableListContainer from '../components/SelectableListContainer';
import OrderBook from '../components/OrderBook';
import Logo from '../../public/assets/img/white_logo_transparent.png'

const coin_list_json = require('../../data/coins.json');
const currencies = ['USD','EUR', 'JPY', 'GBP', 'CHF','CAD', 'AUD', 'NZD', 'ZAR', 'CNY'];
const blockstack = require('blockstack');

const styles = {
	avatar: {
		backgroundColor: '#FFFFFF',
		borderRadius: '50%'
	},
	logoContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100px',
		margin: 'auto'
	},
	logo: {
		display: 'block',
		maxWidth: '200px',
		maxHeight: '80px',
		width: 'auto',
		height: 'auto'
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		height: '80px',	
		backgroundColor: '#00000060',
		justifyContent: 'center',
		marginTop: '20px',
		marginLeft: '10px',
		marginRight: '10px',
		marginBottom: '10px',
		borderRadius: '2px'
	},
	headerTitle: {
		fontSize: '12px',
		color: "#FFFFFF90",
		fontWeight: 100,
		marginTop: '15px',
		marginLeft: '15px',
		marginRight: '15px',
		marginBottom: '0'
	},
	headerSubtitle: {
		fontSize: '22px',
		color: "#FFFFFF",
		fontWeight: 100,
		marginTop: '10px',
		marginLeft: '15px',
		marginRight: '15px',
		marginBottom: '15px'
	},
	drawer: {
		backgroundColor: '#424242',
		overflowX: 'hidden'
	},
	coinOverview: {
		marginLeft: '280px'
	},
	listItem: {
		color: '#FFFFFF',
		fontSize: "13px"
	},
	currencySelectionContainer: {
		display: 'flex',
        flexDirection: 'row',
		margin: 'auto',
		height: '35px',
        justifyContent: 'space-between',
	},
	dropdown: {
        marginRight: '-15px',
		width: '115px',
    },
    dropdownLabel: {
        fontSize: '15px',
        color: '#FFFFFF',
		fontFamily: 'Varela Round, sans-serif'
    },
    dropdownIcon: {
        fill: '#FFFFFF90',
    }, 
    dropdownUnderlineStyle: {
        borderColor: 'rgba(0,0,0,0)'
	},
	dropdownTitle: {
		fontSize: '12px',
		color: "#FFFFFF90",
		fontWeight: 100,
		height: '54px',
		margin: 'auto',
		marginLeft: '15px',
		lineHeight: '54px'
	},
	divider: {
		marginTop: '5px',
		backgroundColor: '#FFFFFF10'
	},
	signOutButton: {
		width: '100%',
		height: '50px',
		lineHeight: '50px',
		color: '#FFFFFF'
	},
	signOutLabel: {
        textTransform: 'none',
        fontSize: '15px',
        fontWight: 100
    }
}

const iconButtonElement = (
	<IconButton
		touch={true}
		tooltipPosition="bottom-left"
	>
	<MoreVertIcon color={"#FFFFFF"} />
	</IconButton>
);

var currentCurrency = currencies[0];
var fileTransactions = {};
var conversionResponseJson = null;
var coinConverstionValue = "";
  
class MainPage extends Component {
  constructor() {
		super();
		this.state = {
			allCoins: [],
			selectedCoin: null,
			symbol: "",
			portfolioValue: "",
			selectedIndex: 1,
			listKey: Math.random(),
			dropDownValue: 1
		}	
	}

	componentWillMount() {
		this.loadLocalFile();
	}

	loadLocalFile() {
		console.log("Retrieving file");
		blockstack.getFile("/coinSummary.json", true)
		.then((fileContents) => {
			console.log("Success loading file");
			console.log(fileContents);

			fileTransactions = JSON.parse(fileContents || '{}');

			let coinList = [];
			for (var key in fileTransactions) {
				if (fileTransactions.hasOwnProperty(key)) {
				  coin_list_json.forEach(function(o){if (o.symbol == key) coinList.push(o);} );
				}
			}
			this.setInitialCoins(coinList);
		}).catch((e) => {
			let coinList = []; 
			for (var i = 0; i < 5; i++) {
				let coin = coin_list_json[i];
				coinList.push(coin);
				fileTransactions[coin.symbol] = [];
			}
		  	this.setInitialCoins(coinList);
		  console.log("Error Retrieving file", e);
		});
	}

	getCurrencyConversions(coin) {
		let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + Object.keys(fileTransactions).toString() + '&tsyms=' + currentCurrency;

		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			conversionResponseJson = responseJson;
			coinConverstionValue = conversionResponseJson[coin.symbol][currentCurrency];
			
			this.setState({
				selectedCoin: coin
			});		
		})
		.catch((error) => {
		console.error(error);
		});
	}
	
	setInitialCoins(coinList) {
		console.log("Setting Initial Coins");
		this.setState({
			allCoins: coinList,
			selectedCoin: coinList[0],
			symbol: coinList[0].symbol
		});

		this.getCurrencyConversions(coinList[0]);
	}

	handleIndexSelected(index) {
		let coin = this.state.allCoins[index - 1];

		this.setState({
			selectedIndex: index,
			symbol: coin.symbol
		});

		this.getCurrencyConversions(coin);
	}
	
	addCoinFromSearch(coin) {
		let coinList = this.state.allCoins; 
		coinList.push(coin);

		fileTransactions[coin.symbol] = [];

		this.setState({
			allCoins: coinList
		});

		this.getCurrencyConversions(coinList[coinList.length]);
	}

	handleCoinDelete(event, coinId, value) {
		let index = this.state.allCoins.findIndex(x => x._id === coinId);
		let coinList = this.state.allCoins;
		
		delete fileTransactions[coinList[index].symbol];

		coinList.splice(index, 1);

		this.setState({
			allCoins: coinList,
			listKey: Math.random(),
			symbol: coinList[0].symbol
		});

		this.getCurrencyConversions(coinList[0]);
	}

	handleTransactionUpdate() {
		var index = this.state.allCoins.findIndex(x => x._id === this.state.selectedCoin._id) + 1;

		this.setState({ 
			selectedIndex: index 
		});

		this.saveLocalFile(JSON.stringify(fileTransactions));
	}

	handleDropdownChange(event, index, value) {
        currentCurrency = currencies[index];
       
        this.setState({
            dropDownValue: value
		});
		
		this.handleIndexSelected(this.state.selectedIndex);
	}

	saveLocalFile(contents) {
		console.log("Putting file");
        blockstack.putFile("/coinSummary.json", contents, true)
        .then(() => {
			console.log("Success putting file");
        }).catch((e) => {
		  console.log("Error putting file", e);
        });
    }
	
	handleSignout() {
		this.props.signUserOut();
	}

	render() {
		let formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currentCurrency,
			minimumFractionDigits: 2
		});

		let totalMarketCap = 0.0;

		this.coins = this.state.allCoins.map((coin, index) => {
			let individualConversionValue = 0;
			if (conversionResponseJson && coin.symbol in conversionResponseJson) {
				individualConversionValue = conversionResponseJson[coin.symbol][currentCurrency];
			}

			let totalHoldings = 0.00
			
			fileTransactions[coin.symbol].map (transaction => {
				if (transaction.type == "Buy") {
					totalHoldings += parseFloat(transaction.quantity);
				} else {
					totalHoldings -= parseFloat(transaction.quantity);
				}
			});

			let marketValue = totalHoldings * parseFloat(individualConversionValue);

			if(isNaN(marketValue) || isNaN(marketValue)) {
				marketValue = 0;
			}

			totalMarketCap += marketValue;
		
			return (
				<ListItem
					value = {index + 1} 
					key = {coin._id}
					style = {styles.listItem} primaryText={coin.name} 
					rightIconButton ={(
						<IconMenu iconButtonElement={iconButtonElement} onChange={this.handleCoinDelete.bind(this)}>
							<MenuItem value = {coin._id}>Remove</MenuItem>
						</IconMenu>
					)}
					secondaryText={
							<p>
							<span style={{color: "#FFFFFF90"}}>{formatter.format(marketValue)}</span>
							</p>
					}
					secondaryTextLines={1} 
					leftAvatar={<Avatar style = {styles.avatar} src= {coin.imageUrl + "?width=80"}/>}
				/>
			);
		});

		if (this.state.selectedCoin) {
			return (
				<div>
					<Drawer containerStyle = {styles.drawer} width={280} openSecondary={false} open={true} zDepth = {0}>
						<div style = {styles.logoContainer}>
							<img style = {styles.logo} src = {Logo}/>
						</div>
						<div style = {styles.currencySelectionContainer}>
							<h1 style = {styles.dropdownTitle}>Selected Currency</h1>
							<DropDownMenu style = {styles.dropdown} labelStyle = {styles.dropdownLabel} value={this.state.dropDownValue} iconStyle = {styles.dropdownIcon} 
							underlineStyle = {styles.dropdownUnderlineStyle}  onChange={this.handleDropdownChange.bind(this)} autoWidth={false}>
								<MenuItem value={1} primaryText="USD" />
								<MenuItem value={2} primaryText="EUR" />
								<MenuItem value={3} primaryText="JPY" />
								<MenuItem value={4} primaryText="GBP" />
								<MenuItem value={5} primaryText="CHF" />
								<MenuItem value={6} primaryText="CAD" />
								<MenuItem value={7} primaryText="AUD" />
								<MenuItem value={8} primaryText="NZD" />
								<MenuItem value={9} primaryText="ZAR" />
								<MenuItem value={10} primaryText="CNY" />
							</DropDownMenu>
						</div>	
						<div style = {styles.header}> 
							<h1 style = {styles.headerTitle}>Overall Portfolio</h1>
							<h1 style = {styles.headerSubtitle}>{formatter.format(totalMarketCap)}</h1>
						</div>
						<PortfolioCoinSearchBar addCoin = {this.addCoinFromSearch.bind(this)}/>
						<SelectableListContainer key = {this.state.listKey} defaultValue={1} selectedIndex = {this.state.selectedIndex} indexUpdated = {this.handleIndexSelected.bind(this)}>
							{this.coins}
						</SelectableListContainer>
						<Divider style = {styles.divider} />
						<FlatButton style = {styles.signOutButton}  label="Sign out" primary = {false} labelStyle={styles.signOutLabel} onClick = {this.handleSignout.bind(this)} /> 
					</Drawer>
					<div style = {styles.coinOverview}> 
						<CoinOverview coin = {this.state.selectedCoin} conversionValue = {coinConverstionValue} currency = {currentCurrency} fileTransactions = {fileTransactions} updateMainList = {this.handleTransactionUpdate.bind(this)}/>
						<Chart symbol = {this.state.symbol} currency = {currentCurrency} />
						<OrderBook symbol = {this.state.symbol} currency = {currentCurrency} conversionValue = {coinConverstionValue}/>
					</div> 
				</div>
			);
		} else {
			return ( 
				<RefreshIndicatorView />
			);
		}
	}
}
  
export default MainPage;