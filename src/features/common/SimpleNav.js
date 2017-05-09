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

  componentDidMount(){
    window.fbAsyncInit = () => {
      this.setState({FB: true});
      FB.init({
        appId      : '300312007074548',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
      FB.getLoginStatus( (response) => {
        if(response.status === 'connected') {
          FB.api('/me', (resp) => {
            this.props.actions.loginUser(resp);
          });
        }
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

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

        {window.FB ?
          (<div className="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>) :
          ('')
        }
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/campaigns">Campaigns</Link></li>
          <li><Link to="/contributors">Contributors</Link></li>
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
