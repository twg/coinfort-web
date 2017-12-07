import React, { Component } from 'react';

const styles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '250px',
      margin: 'auto',
      marginTop: '50px',
      justifyContent: 'center',
      backgroundColor: '#EEEEEE'
    },
    header: {
      color: '#424242',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 300
    },
    subHeader: {
      color: '#424242',
      fontSize: 13,
      textAlign: 'center',
      fontWeight: 200
    },
    link: {
      color: '#424242'
    }
}

class Footer extends Component {
  render() {
    return (
        <div style = {styles.root}>
           <h1 style={styles.header}>Made by <a href={"https://twitter.com/sbambra"} style={styles.link} target="_blank">Satraj Bambra</a>.</h1>
           <h1 style={styles.header}>Coinfort © 2017. Powered by Blockstack.</h1>
        </div>
    );
  }
}

export default Footer;