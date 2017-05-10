/*
 * This is a very simple navigation tree for testing purpose.
 * It groups URLs by features.
*/

import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../home/redux/actions';

class SimpleNav extends PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };



  renderLinks(items, basePath) {
    return (
      <ul>
        {
          items.reduce((prev, item) => {
            let path;
            if (/^\//.test(item.path)) {
              path = item.path;
            } else if (basePath === '/') {
              path = `/${item.path}`;
            } else {
              path = `${basePath}/${item.path}`;
            }
            prev.push(<li key={path}><Link to={path}>{item.name || item.path}</Link></li>);

            if (item.childRoutes && item.childRoutes.length) {
              prev.push(<li key={`${path}_wrapper`}>{this.renderLinks(item.childRoutes, path)}</li>);
            }
            return prev;
          }, [])
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="common-simple-nav">


        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/campaigns">Campaigns</Link></li>
          <li><Link to="/contributors">Contributors</Link></li>
          <li><a href ="https://vimeo.com/album/4578100" target="_blank">Help Videos</a></li>
          <li><a href ="https://squareup.com/store/paul-oliva" target="_blank">Donate</a></li>
          <li><a href="/privacy" target="_blank">Privacy</a></li>
        </ul>
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
)(SimpleNav);
