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
      <div className="home-default-page">
          {

              (this.props.home.currentUser) ?
                  (
                      <h2>Hello {this.props.home.currentUser.name}</h2>
                  ) :

                  <h2>Please login: </h2>
          }
          <input type="text" className="searchBar" placeholder="Search" />
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
