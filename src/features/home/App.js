import React, { Component, PropTypes } from 'react';
import routeConfig from '../../common/routeConfig';
import SimpleNav from '../common/SimpleNav';
import TopNav from '../common/TopNav';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {FB: window.FB}
  }
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

  componentDidMount(){
    setTimeout(function(){(adsbygoogle = window.adsbygoogle || []).push({})}, 1000);
  }



  render() {
    return (
      <div className="home-app">
        <TopNav routes/>
          <div className="container" style={{marginBottom: "10px"}}>
              <div style={{border: "1px solid black", width:"720px", height: "90px", marginLeft:"200px"}}>
                  <ins className="adsbygoogle"
                       style={{display:"inlineBlock",width:'728px',height:'90px'}}
                       data-ad-client="ca-pub-1303389657186007"
                       data-ad-slot="1838441776">
                  </ins>
              </div>
          </div>
        <div className="page-container">
          {this.props.children}

        </div>
      </div>
    );
  }
}
