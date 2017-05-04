import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RedditList } from './';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
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
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList } = this.props.actions;
    return (
      <div className="home-default-page">
          {(this.props.home.users.currentUser) ? <h2>Hello {this.props.home.users.currentUser.name}</h2> : <h2>Please login: </h2>}
          <div className="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
          <a href="http://github.com/supnate/rekit"><img src={require('../../images/logo.png')} className="app-logo" alt="logo" /></a>
        <h1>Welcome to your Rekit project!</h1>
        <p>
          Contratulations! You have created your Rekit app successfully! Seeing this page means everything works well now.
        </p>
        <p>
          By default <a href="https://github.com/supnate/rekit-portal">Rekit portal</a> is also started at <a href="http://localhost:6076">http://localhost:6076</a> to manage the project.
        </p>
        <p>
          The app has been initialized with two features named &quot;common&quot; and &quot;home&quot; and two samples: counter and Reddit list viewer as shown below.
          To remove samples and clean the project, run below commands:
        </p>
        <ul className="cmd">
          <li>$ rekit clean</li>
        </ul>
        <p>
          It will delete all samples and clean the root container (remove the default two-columns layout).
          For more command line tools usage, please visit: <a href="http://github.com/supnate/rekit">http://github.com/supnate/rekit</a>.
        </p>

        <h3>Demos</h3>
        <p>Open the browser console to see Redux action logs.</p>
        <p className="section-title">To quickly see how Redux works in the project, here is the demo of a simple counter:</p>
        <div className="demo-count">
          <button className="btn-minus-one" onClick={counterMinusOne} disabled={count === 0}>-</button>
          <label>{count}</label>
          <button className="btn-plus-one" onClick={counterPlusOne}>+</button>
          <button className="btn-reset-counter" onClick={resetCounter}>Reset</button>
        </div>

        <p className="section-title">To see how async flow works, here is an example of fetching reddit reactjs topics:</p>
        <div className="demo-reddit">
          <button className="btn-fetch-reddit" disabled={fetchRedditReactjsListPending} onClick={fetchRedditReactjsList}>
            {fetchRedditReactjsListPending ? 'Fetching...' : 'Fetch reactjs topics'}
          </button>
          {
            fetchRedditReactjsListError &&
              <div className="fetch-list-error">
                Failed to load: {fetchRedditReactjsListError.toString()}
              </div>
          }
          <RedditList list={redditReactjsList} />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
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
