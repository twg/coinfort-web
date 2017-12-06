import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '300px',
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
};

const RefreshIndicatorView = () => (
  <div style = {styles.root}> 
    <div style={styles.container}>
      <RefreshIndicator
        size={50}
        left={0}
        top={0}
        loadingColor="#29B6F6"
        status="loading"
        style={styles.refresh}
      />
    </div>
  </div>
);

export default RefreshIndicatorView;