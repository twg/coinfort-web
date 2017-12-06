import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

const COIN_LIST_JSON = require('../../data/coins.json');

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '10px',
    justifyContent: 'space-around'
  },
  searchBar: {
    width: '280px',
    margin: '0 auto',
    marginLeft: '10px',
    marginRight: '10px',
    boxShadow: '0px 0px 0px #00000000',
    borderRadius: '2px'
  },
  textFieldStyle: {
    color: '#455A64',
    fontSize: '15px'
  },
  menuItemStyle: {
    color: '#455A64',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '12px'
  }
};

class PortfolioCoinSearchBar extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      inputValue: ""
    };
  }

  handleUpdateInput(searchText) {
    if (searchText === "") {
      this.setState({
        dataSource: [],
        inputValue: ""
      });
    } else {
      this.setState({
        dataSource: COIN_LIST_JSON,
        inputValue: searchText
      });
    }
  };

  handleUserSelection(chosenRequest, index) {
    if (index > -1) {
      let coin = this.state.dataSource[index];
      this.props.addCoin(coin);

      this.setState({
        inputValue: ""
      });
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <SearchBar style={styles.searchBar}
          ref = "searchBar"
          textFieldStyle = {styles.textFieldStyle}
          popoverProps={{ style: { width: 200 } }}
          menuStyle = {styles.listStyle}
          onChange = {this.handleUpdateInput.bind(this)} 
          onRequestSearch={() => console.log('search requested')} 
          onNewRequest = {this.handleUserSelection.bind(this)}
          hintText="Add a coin"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.dataSource.map((val) => { return {
            text: val.name,
            value: (
              <MenuItem
                autoWidth = {true}
                primaryText={val.name}
                style={styles.menuItemStyle}
              />
            ) }
          })}
          maxSearchResults={5}
          menuCloseDelay = {0}
          value = {this.state.inputValue}/>
      </div>
    );
  }
}

export default PortfolioCoinSearchBar;
