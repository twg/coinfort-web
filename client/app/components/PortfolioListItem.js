import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/navigation/close';

var currentCurrency = '';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
        justifyContent: 'space-around'
      },
      paper: {
        width: '700px',
        height: '80px',
      },
      subHeader: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '700px',
        flexWrap: 'wrap',
        height: '80px',
        margin: 'auto',  
        justifyContent: 'flex-start'
      },
      icon: {
        width: '25px',
        height: '25px',
        marginLeft: '20px'
      },
      headerContainer: {
        flexDirection: 'column',
        marginLeft: '15px'
      },
      headerTop: {
        fontSize: '19px',
        fontWeight: 400,
        color: '#455A64',
        fontFamily: 'Varela Round, sans-serif',
        marginTop: '12px'
      },
      headerBottom: {
        fontSize: '15px',
        fontWeight: 400,
        color: '#B0BEC5',
        fontFamily: 'Varela Round, sans-serif',
        marginTop: '-6px'
      },
      textfieldContainer: {
        alignItems: 'center',
        display: 'flex',
        height: "40px",
        width: '200px',
        marginLeft: 'auto',
        marginRight: '0px',
        border: '1px solid',
        borderRadius: '2px',
        borderColor: '#F5F5F5',
      },
      textField: {
        fontSize: '18px',
        marginLeft: '10px',
        marginRight: '10px',
        color: '#424242',
        fontFamily: 'Varela Round, sans-serif'
      },
      textFieldInputStyle: {
          textAlign: 'right',
          width: '100%',
          fontSize: '16px',
      },
      underlineStyle: {
          borderColor: '#F5F5F5'
      },
      underlineStyleFocused: {
        borderColor: '#29B6F6'
      },
      divider: {
        backgroundColor: '#EEEEEE'
      },
      deleteIconButton: {
        width: '40px',
        marginRight: '10px'
      }
}

class PortfolioListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hintText: '0.00000000',
      conversionValue: 0,
      convertedValueLabel: '0.00'
    };
  }

  componentWillMount() {
    if (this.props.currencyChanged) {
      currentCurrency = this.props.currencyChanged;

      this.getCurrencyConversions();
    }      
  }

  componentDidMount() {
    let hintText = "0.00000000";
    if (this.props.coin.amountInvested != hintText) {
      this.refs.amountInvested.getInputNode().value = this.props.coin.amountInvested.toString();
      hintText = "";
    } 
   
    this.setState({
      hintText: hintText,
    });
  }

  componentWillReceiveProps(props) {
    if(props.currencyChanged && this.props.currencyChanged != props.currencyChanged) {
        currentCurrency = props.currencyChanged;
        this.getCurrencyConversions();
    }
}

  getCurrencyConversions() {
    let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + this.props.coin.symbol + '&tsyms=' + currentCurrency;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let symbol = this.props.coin.symbol;
        this.setState({
          conversionValue: responseJson[symbol][currentCurrency],
        });

        let updatedValue = this.state.conversionValue * this.refs.amountInvested.getValue();
        
        this.updateAllFieldsAfterConverstion(updatedValue);
       
        this.props.coin.convertedAmountInvested = updatedValue;
       
        this.props.updateCoin();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  updateAllFieldsAfterConverstion(updatedValue) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency,
      minimumFractionDigits: 2
    });
    this.setState({
      convertedValueLabel: formatter.format(updatedValue),
    });
  }

  handleOnChange(e) {
    if (this.state.hintText != '0.00000000') {
      this.setState({
        hintText: '0.00000000',
      });
    }

    let updatedValue = this.state.conversionValue * e.target.value
    
    this.props.coin.amountInvested = e.target.value;
    
    this.props.coin.convertedAmountInvested = updatedValue;
    
    this.updateAllFieldsAfterConverstion(updatedValue);
    
    this.props.updateCoin();
  }

  handleOnDelete() {
    this.props.coinDeleted(this.props.coin);
  }

  render() {
    return (
        <div style = {styles.root}>
            <Paper style = {styles.paper} zDepth = {0}>
                <div style={styles.subHeader}> 
                    <img style = {styles.icon} 
                        src= {this.props.coin.imageUrl + "?width=80"} 
                        className = "img-responsive" />
                    <div style = {styles.headerContainer} > 
                      <h1 style = {styles.headerTop}>{this.props.coin.name}</h1>
                      <h1 style = {styles.headerBottom}>{this.state.convertedValueLabel}</h1>
                    </div>
                    
                    <div style = {styles.textfieldContainer}> 
                      <TextField style = {styles.textField}
                          ref = "amountInvested"
                          onChange = {this.handleOnChange.bind(this)}
                          inputStyle = {styles.textFieldInputStyle} 
                          hintStyle = {styles.textFieldInputStyle}
                          underlineStyle = {styles.underlineStyle} 
                          underlineFocusStyle = {styles.underlineStyleFocused}
                          hintText= {this.state.hintText}
                          underlineShow = {false}/>
                    </div>
                    <IconButton onClick = {this.handleOnDelete.bind(this)}><IconDelete color = {'#E0E0E0'} /></IconButton>
                </div>
                <Divider style = {styles.divider} />
            </Paper>
        </div>  
    );
  }
}

export default PortfolioListItem;
