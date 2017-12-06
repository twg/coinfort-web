import React, { Component } from 'react';

const styles = {
    root: {
      display: 'flex',
      width: '100%',
      height: '300px',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#29B6F6',
      background: '-webkit-linear-gradient(#29B6F6, #039BE5)',
      background: '-o-linear-gradient(#29B6F6, #039BE5)',
      background: '-moz-linear-gradient(#29B6F6, #039BE5)',
      background: 'linear-gradient(#29B6F6, #039BE5)'
    },
    header: {
      color: '#ffffff',
      fontSize: 60,
      marginBottom: '100px',
      fontFamily: 'Varela Round, sans-serif'
    },
}

class PortfolioValue extends Component {
  render() {
    return (
        <div style={styles.root}>
          <h1 style={styles.header}>{this.props.totalCoinValue}</h1>
        </div>
    );
  }
}
export default PortfolioValue;