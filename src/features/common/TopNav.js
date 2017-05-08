import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TopNav extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const showBackButton = new RegExp(window.location.origin).test(document.referrer);
    return (
      <div className="common-top-nav">
        {showBackButton ?
          <button
            className="btn"
            style={{
              position: 'fixed',
              top: '-7px',
              left: '190px',
              fontSize: '36px',
              backgroundColor: 'transparent',
              padding: 0,
              height: '40px'
            }}
            onClick={() => window.history.back()}>←
          </button> :
          ''
        }

      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
