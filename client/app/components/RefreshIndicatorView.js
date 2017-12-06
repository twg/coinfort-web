import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF'
  },
  container: {
    position: 'relative'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  title: {
		fontSize: '12px',
		color: "#FFFFFF90",
		fontWeight: 100,
		height: '45px',
		margin: 'auto',
		marginLeft: '15px',
		lineHeight: '54px'
	}
};

const RefreshIndicatorView = () => (
  <div style = {styles.root}>
    <h1>Securely retrieving your data.</h1> 
    <div style={styles.container}>
      <CircularProgress color = "#424242"/>
    </div>
  </div>
);

export default RefreshIndicatorView;