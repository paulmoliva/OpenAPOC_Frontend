import React, { Component, PropTypes } from 'react';
import routeConfig from '../../common/routeConfig';
import SimpleNav from '../common/SimpleNav';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

    componentDidMount(){
        window.fbAsyncInit = () => {
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
      <div className="home-app">
        <div className="sidebar">
          <SimpleNav routes={routeConfig} />
          <p className="memo">
            Above is a simple navigation tree for you to navigate between pages,
            it&apos;s generated from the route config so it will be auto updated
            when you add/remove features or pages.
          </p>
        </div>
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
