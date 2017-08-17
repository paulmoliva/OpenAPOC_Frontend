import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };



  render() {
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList } = this.props.actions;
    return (
      <div className="home-default-page standardPage panel panel-default">
        <h1 className="panel-heading">DataShark 1.0 ℹ</h1>
        <div className="panel-body">
            <p>The data used in this version was calculated using a deprecated version of the scoring algorithm and is not guaranteed to be 100% accurate. Use at your own risk.</p>
            <p>Version 1 will contain updated campaign scores and lean scores.</p>
            <p>The v0.11 [DEPRECATED] scoring algorithm:</p>
            <h3>Contributor Score</h3>
            <ul>
              <li>( SUM($ contributed to lefty candidates) - SUM($ contributed to righty candidates) )</li>
            </ul>
            <h3>Campaign Score</h3>
            <ul>
              <li>
                {(`
                FOR
                  each contributor in the campaign's contributors:
                    IF each_contributor.score > 1, campaign_score += 1
                    ELIF each_contributor.score < -1, campaign score -=1
                `)}
              </li>
            </ul>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    users: state.users
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
)(DefaultPage);
