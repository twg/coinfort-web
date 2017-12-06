import React, { Component } from 'react';
import PortfolioListItem from './PortfolioListItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ToggleDisplay from 'react-toggle-display';
import RefreshIndicatorView from './RefreshIndicatorView';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const blockstack = require('blockstack');
const coin_list_json = require('../../data/coins.json');
const currencies = ['USD','EUR', 'JPY', 'GBP', 'CHF','CAD', 'AUD', 'NZD', 'ZAR', 'CNY'];
const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 'auto',
      justifyContent: 'space-around',
      marginTop: '40px'
    },
    paper: {
      width: '700px',
      backgroundColor: '#ECEFF1',
      margin: '0 auto',
      marginLeft: '20px',
      marginRight: '20px',
      marginBottom: '20px'
    }, 
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        margin: '0 auto',
        width: '700px',
        height: '50px',
        justifyContent: 'space-between',
    },
    title: {
        marginLeft: '20px',
        fontSize: '15px',
        color: '#37474F',
        fontFamily: 'Varela Round, sans-serif'
    },
    button: {
        width: '700px',
        height: '60px',
        lineHeight: '60px',
        backgroundColor: '#4CAF50'
    },
    label: {
        fontFamily: 'Varela Round, sans-serif',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        fontSize: 20,
        fontWight: 200
    },
    overlay: {
        height: '60px'
    },
    dropdown: {
        marginBottom: '10px',
        marginTop: '8px',
        marginRight: '-15px',
        width: '115px'
    },
    dropdownLabel: {
        fontSize: '15px',
        color: '#37474F',
        fontFamily: 'Varela Round, sans-serif'
    },
    dropdownIcon: {
        fill: '#37474F',
    }, 
    dropdownUnderlineStyle: {
        borderColor: 'rgba(0,0,0,0)'
    }
}

var allCoins = [];

class PortfolioList extends Component {
    constructor() {
      super();
        this.state = {
         startingCoinList: [],
         show: false,
         saveButtonText: 'Save',
         saveButtonDisabled: false,
         dropDownValue: 1,
         selectedCurrency: ''
      }
    }

    componentWillMount() {
      this.loadCoinListFile();
    }

    setCurrencyAfterDelay(currency) {
        setTimeout(this.setState({
            selectedCurrency: currency
        }), 2000);
    }

    loadCoinListFile() {
      blockstack.getFile("/localCoins.json", true)
      .then((fileContents) => {
        var coinList = JSON.parse(fileContents || '[]');
        this.setState({
            startingCoinList: coinList,
            show: true
        });
        
        this.setCurrencyAfterDelay(currencies[0]);
      }).catch((e) => {
        this.createNewListAndSaveFile();
      });
    }

    createNewListAndSaveFile() {
        let coinList = []  
        for (var i = 0; i < 5; i++) {
          let coin = coin_list_json[i]
          coinList.push(coin);
        }
        
        this.setState({
            startingCoinList: coinList,
            show: true
        });

        this.setCurrencyAfterDelay(currencies[0]);
        
        this.saveCoinListFile(JSON.stringify(this.state.startingCoinList));
    }

    saveCoinListFile(contents) {
        blockstack.putFile("/localCoins.json", contents, true)
        .then(() => {
            this.setState({
                saveButtonText: 'Save',
                saveButtonDisabled: false
            });
        }).catch((e) => {
          console.log(e);
          this.setState({
            saveButtonText: 'Save',
            saveButtonDisabled: false
          });
        });
    }

    componentWillReceiveProps(props) {
        if(props.coinToAdd && this.props.coinToAdd != props.coinToAdd) {
            let index = this.state.startingCoinList.findIndex(x => x._id === props.coinToAdd._id); 
            if (index < 0) {
                let coinList = this.state.startingCoinList;
                coinList.push(props.coinToAdd);
                this.setState({startingCoinList: coinList});
            }
        }
    }

    sumAllCoinValues() {
        let totalAmount = 0.0000;
        this.allCoins.map (coin => {
            if (coin.props.coin.convertedAmountInvested) {
                totalAmount += coin.props.coin.convertedAmountInvested;
            }
        })

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.state.selectedCurrency,
            minimumFractionDigits: 2
          });

        this.props.updateTotalValue(formatter.format(totalAmount));
    }

    handleCoinDeleted(coin) {
        let index = this.state.startingCoinList.findIndex(x => x._id === coin._id);
        let coinList = this.state.startingCoinList;
        coinList.splice( index, 1 );
        this.allCoins.splice( index, 1 );
        
        this.setState({startingCoinList: coinList});

        this.sumAllCoinValues();
    }

    handlePortfolioSave() {
        let allCoinsToSave = []
        this.allCoins.map (coin => {
            let coinToSave = coin.props.coin;
            allCoinsToSave.push(coinToSave);
        })
        this.setState({
            saveButtonText: 'Saving...',
            saveButtonDisabled: true
        });
        this.saveCoinListFile(JSON.stringify(allCoinsToSave));
    }

    handleDropdownChange(event, index, value) {
        let newCurrency = currencies[index];
       
        this.setState({
            dropDownValue: value,
            selectedCurrency: newCurrency
        });
    }

    render() {
        this.allCoins = this.state.startingCoinList.map(coin => {
            return (
              <PortfolioListItem key = {coin._id} coin = {coin} currencyChanged = {this.state.selectedCurrency} updateCoin = {this.sumAllCoinValues.bind(this)} coinDeleted = {this.handleCoinDeleted.bind(this)}/>
            );
        });
    
        return (
          <div style={styles.root}>
            <Paper style = {styles.paper} zDepth={1}>
            <ToggleDisplay show={!this.state.show}> 
                <RefreshIndicatorView />
            </ToggleDisplay>
              <ToggleDisplay show={this.state.show}> 
                  <div style={styles.header}> 
                    <h1 style={styles.title}>YOUR HOLDINGS</h1>
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
                  {this.allCoins}
                  <RaisedButton primary ={true} label={this.state.saveButtonText} disabled = {this.state.saveButtonDisabled} labelPosition="before" buttonStyle = {styles.button} 
                  overlayStyle={styles.overlay} labelStyle={styles.label} onClick = {this.handlePortfolioSave.bind(this)}/>
              </ToggleDisplay>
            </Paper>  
         </div>
        );
      }
    }

export default PortfolioList;