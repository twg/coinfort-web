import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HomePage from '../../components/HomePage';
import NavigationBar from '../../components/NavigationBar';
import PortfolioValue from '../../components/PortfolioValue';
import PortfolioCoinSearchBar from '../../components/PortfolioCoinSearchBar';
import PortfolioList from '../../components/PortfolioList';
import RefreshIndicatorView from '../../components/RefreshIndicatorView'
import Footer from '../../components/Footer';
import MainPage from '../../components/MainPage';

const blockstack = require('blockstack');
const muiTheme = getMuiTheme({
  fontFamily: 'Varela Round, sans-serif',
  palette: {
    primary1Color: '#424242',
    pickerHeaderColor: '#424242',
  },
  datePicker: {
    selectColor: '#424242',
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalCoinValue: "0.00",
      coinToAdd: null,
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  signIn() {
    blockstack.redirectToSignIn();
  }
  
  signOut() {
    blockstack.signUserOut('/');
  }

  setTotalCoinValue(value) {
    this.setState({
      totalCoinValue: value
    });
  }

  addCoinFromSearch(coin) {
    this.setState({
      coinToAdd: coin
    });
  }

  render() {
    // A lot of this was taken from here:
    // https://blockstack.github.io/blockstack.js/index.html#authentication
    // Not the blockstack.js README docs.


    // Just adding this for dev to verify it's properly loaded.
    // console.log('blockstack:');
    // console.log(blockstack);

    // This will contain html for log in actions pending on log in status
    let logInContent = null;

    if (blockstack.isUserSignedIn()) {
      // Show the current user
      const userData = blockstack.loadUserData();

      const person = new blockstack.Person(userData.profile);

      logInContent = (
        <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <MainPage signUserOut = {this.signOut}/>
        </div>
      </MuiThemeProvider>
      );
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn(
        // I had to hard code this cause I was getting nameReplaceLookup.replace
        // undefined.
        'https://core.blockstack.org/v1/names'
      ).then((userData) => {
        location.reload();
      });

      logInContent = (
        <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        </div>
        </MuiThemeProvider>
      );
    } else {
      logInContent = (
        <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <HomePage signUserIn = {this.signIn}/>
          <Footer />
        </div>
      </MuiThemeProvider>
      );
    }
    
    return (
      <div>
        {logInContent}
      </div>
    );
  }
}

export default App;
