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
      let marginTop;
      let adSlot;
      if(!this.props.campaigns.contributions.length){
          marginTop = '4px';
          adSlot = false;
      }  else {
          marginTop = '5px';
      }
    return (
      <div className="common-top-nav">
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
        </button>
          {
              adSlot ?
                  (
                      <ins className="adsbygoogle"
                           style={{display:"inlineBlock",width:'728px',height:'90px', marginLeft:'420px', marginTop:marginTop}}
                           data-ad-client="ca-pub-1303389657186007"
                           data-ad-slot="3315174973">
                      </ins>
                  ) :
                  (
                      ''
                  )
          }

      </div>
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
