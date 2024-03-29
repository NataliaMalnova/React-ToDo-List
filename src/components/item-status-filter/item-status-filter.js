import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

  buttons = [
    {name: 'all', label: 'Все'},
    {name: 'active', label: 'Активные'},
    {name: 'done', label: 'Выполненные'}
  ];

  render(){

    const {filter, onFilterChange} = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      //кнопка активная когда название фильтра совпадает с name
      const isActive = filter===name;
      const clazz= isActive ? 'btn-info' : 'btn-outline-secondary';
      return(
        <button type="button"
                className={`btn ${clazz}`}
                key = {name}
                onClick = {() => onFilterChange(name)}>
                {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
