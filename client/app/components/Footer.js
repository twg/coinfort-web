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
      backgroundColor: '#37474F'
    },
    header: {
      color: '#EEEEEE',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Varela Round, sans-serif',
      fontWeight: 200
  },
}

class Footer extends Component {
  render() {
    return (
        <div style = {styles.root}>
           <h1 style={styles.header}>Made with ♥ in Toronto.</h1>
           <h1 style={styles.header}>Coinfolio © 2017, Version 0.1 alpha</h1>
        </div>
    );
  }
}

export default Footer;