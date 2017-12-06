import React, {Component, PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';

let SelectableList = makeSelectable(List);

class SelectableListContainer extends React.Component {
    constructor() {
        super();
        this.state = {selectedIndex: 1};
    }

    handleRequestChange (event, index) {
        this.setState({
            selectedIndex: index
        })

        this.props.indexUpdated(index);
    }

    render() {
        return (<div>{this.renderAside()}</div>);
    }

    renderAside() {
        return (
            <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange.bind(this)}>
                {this.props.children}
            </SelectableList>
        );
    }
}

export default SelectableListContainer;
  