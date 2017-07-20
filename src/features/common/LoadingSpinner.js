import React, { Component, PropTypes } from 'react';

export default class LoadingSpinner extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-loading-spinner">
        <p>Loading...</p>
        <img className="loader" src="https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif" />
        <p>Loading your data.</p>
      </div>
    );
  }
}
