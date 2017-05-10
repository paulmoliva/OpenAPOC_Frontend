import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link, Router } from 'react-router';

export class TopNav extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
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

  render() {
    return (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">OPENAPOC</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">

                    <li className={`nav-item  waves-effect waves-light ${window.location.pathname === "/" ? 'active' : ''}`}>
                        <Link className="nav-link waves-effect waves-light" to="/">Home </Link>
                    </li>
                    <li className={`nav-item waves-effect waves-light  ${window.location.pathname === "/campaigns" ? 'active' : ''}`}>
                        <Link className="nav-link waves-effect waves-light" to="/campaigns">Campaigns </Link>
                    </li>
                    <li className={`nav-item waves-effect waves-light  ${window.location.pathname === "/contributors" ? 'active' : ''}`}>
                        <Link className="nav-link waves-effect waves-light" to="/contributors">Contributors</Link>
                    </li>
                    <li className="nav-item waves-effect waves-light">
                        <Link className="nav-link waves-effect waves-light" to="https://vimeo.com/album/4578100" target="_blank">Help Videos</Link>
                    </li>
                    <li className="nav-item waves-effect waves-light">
                        <Link className="nav-link waves-effect waves-light" to="https://squareup.com/store/paul-oliva" target="_blank">Donate</Link>
                    </li>
                    <li className="nav-item waves-effect waves-light">
                        <a className="nav-link waves-effect waves-light" target="_blank" href="/privacy">Privacy</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>{window.FB ?
                        (<div style={{marginTop: "10px"}} className="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>) :
                        ('')
                    }</li>
                </ul>
            </div>
        </div>
    </nav>

    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    campaigns: state.campaigns,
    contributors: state.contributors
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
