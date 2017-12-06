import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Logo from '../../public/assets/img/logo_dark_transparent.png';
import ComputerHome from '../../public/assets/img/computer_home.png';
import ActionTwitter from '../../public/assets/img/twitter.svg';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentRowContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '80%',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentRow: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '100%',
        margin: 'auto'
    },
    imageLogo: {
        display: 'block',
        maxWidth: '300px',
        maxHeight: '150px',
        width: 'auto',
        height: 'auto',
        marginLeft: '30%',
        marginRight: '30%',
        marginBottom: '20px'
    },
    imageComputer: {
        display: 'block',
        maxWidth: '80%',
        maxHeight: '80%',
        width: 'auto',
        height: 'auto',
        marginLeft: '20px',
        marginRight: 'auto'
    },
    header: {
        color: '#424242',
        fontSize: '23px',
        marginLeft: '30%',
        marginRight: '20px',
        marginBottom: '40px',
        textAlign: 'left',
        fontWeight: 100
    },
    button: {
        width: '300px',
        height: '50px',
        lineHeight: '50px',
        backgroundColor: '#2B0C36'
    },
    label: {
        fontFamily: 'Varela Round, sans-serif',
        color: '#FFFFFF',
        textTransform: 'none',
        fontSize: '18px',
        fontWight: 100
    },
    overlay: {
        height: '50px'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
        backgroundColor: '#F5F5F5'
    },
    footerTitle: {
        color: '#424242',
        fontSize: '15px',
        marginLeft: '20%',
        marginRight: '20%',
        textAlign: 'center',
        fontWeight: 100
    }
}

class HomePage extends Component {
    handleSignin(button) {
        this.props.signUserIn();
    }
    /*<img style = {styles.image} src = {Logo}/>
            <h1 style={styles.header}>Easily track and manage your cryptocurrency portfolio.</h1>
            <h1 style={styles.subHeader}>Your data is encrypted and only visible to you using Blockstack Gaia storage.</h1>
            <RaisedButton primary ={true} label="Sign in with Blockstack" labelPosition="before" buttonStyle = {styles.button} 
            overlayStyle={styles.overlay} labelStyle={styles.label} onClick = {this.handleSignin.bind(this)}/>*/

    render() {
      return (
          <div style = {styles.root}>
            <div style = {styles.contentRowContainer}> 
                <div style = {styles.contentRow}> 
                    <img style = {styles.imageLogo} src = {Logo}/>
                    <h1 style={styles.header}>All your crypto investments in one easy dashboard. Fully encrypted and only visible to you using Blockstack Gaia storage.</h1>
                    <RaisedButton primary ={true} label="Sign in with Blockstack" labelPosition="before" buttonStyle = {styles.button} 
            overlayStyle={styles.overlay} labelStyle={styles.label} onClick = {this.handleSignin.bind(this)}/>
                </div>
                <div style = {styles.contentRow}> 
                    <img style = {styles.imageComputer} src = {ComputerHome}/>
                </div>
            </div>
            <div style = {styles.footer}> 
                <h1 style={styles.footerTitle}>Made by Satraj Bambra</h1>
            </div>
          </div>
      );
    }
  }
  
  export default HomePage;