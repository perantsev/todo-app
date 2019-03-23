import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    buttons = [
      {
        label: 'All',
        status: 'all'
      },
      {
        label: 'Active',
        status: 'active'
      },
      {
        label: 'Done',
        status: 'done'
      },
    ];

  render() {

    const { statusFilter } = this.props;
    const elements = this.buttons.map(({status, label}) => {
      const isActive = statusFilter === status;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          className={`btn ${clazz}`}
          onClick={() => this.props.onStatusFilterChange(status)}>
          { label }    
        </button>
      )
    });

    return (
      <div className="btn-group">
        { elements }
      </div>
    );
  }
}