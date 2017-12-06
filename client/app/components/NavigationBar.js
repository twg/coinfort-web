import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import Logo from '../../public/assets/img/white_logo_transparent.png'

const styles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      height: '90px',
      margin: 'auto',
      justifyContent: 'space-around',
      backgroundColor: '#29B6F6'
    },
    image: {
      display: 'block',
      maxWidth: '200px',
      maxHeight: '90px',
      width: 'auto',
      height: 'auto'
    },
    tab: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: '50px',
      marginTop: '10px'
    },
    tabButton: {
      fontFamily: 'Varela Round, sans-serif',
      marginLeft: "20px",
      marginRight: "20px",
      fontSize: 15,
    },
    inkBarStyle: {
      backgroundColor: '#FFFFFF'
    }
}

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  };

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

  handleSignout(tab) {
    this.props.signUserOut();
  }

  render() {
    return (
        <div style = {styles.root}>
          <img style = {styles.image} src = {Logo}/>
          <Tabs tabItemContainerStyle = {styles.tab} inkBarStyle = {styles.inkBarStyle}>
            <Tab buttonStyle= {styles.tabButton} label="Portfolio" />
            <Tab buttonStyle= {styles.tabButton} label="Markets" onActive = {this.handleTouchTap.bind(this)}/>
            <Tab buttonStyle= {styles.tabButton} label="News" onActive = {this.handleTouchTap.bind(this)}/> 
            <Tab buttonStyle= {styles.tabButton} label="Sign out" onActive = {this.handleSignout.bind(this)} /> 
          </Tabs>
          <Snackbar
            open={this.state.open}
            message="This section and more will be added shortly."
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose.bind(this)}
          />
        </div>
    );
  }
}

export default NavigationBar;
