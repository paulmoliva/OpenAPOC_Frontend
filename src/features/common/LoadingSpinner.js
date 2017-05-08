import React, { Component, PropTypes } from 'react';

export default class LoadingSpinner extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-loading-spinner">
        <p>Loading...</p>
        <img className="loader" src="https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif" />
        <p>Please do not read this text.</p>
      </div>
    );
  }
}
