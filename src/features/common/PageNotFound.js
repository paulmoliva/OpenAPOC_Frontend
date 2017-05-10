import React, { PureComponent } from 'react';

export default class PageNotFound extends PureComponent {
  render() {
    return (
      <div className="common-page-not-found">
        Page not found.
        <img src="http://changelog.lightspeedanalytics.net/assets/images/404.gif" />
      </div>
    );
  }
}
