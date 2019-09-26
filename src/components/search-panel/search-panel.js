import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component{
  state = {
    term: ''
  };
  onSerchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSerchChange(term);
  };
  render(){
  return(
    <input type="text"
              className="form-control search-input"
              placeholder="Найти"
              value = {this.state.term}
              onChange={this.onSerchChange} />
  );
};
};
