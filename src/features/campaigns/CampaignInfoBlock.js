import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class CampaignInfoBlock extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    if(this.props.campaigns.info){
        const info = this.props.campaigns.info;
        let style = {};
        let leansText = 'n/a';
        if (info.leans === 'l'){
          style = {backgroundColor: 'rgba(0,0,250,0.3)'};
          leansText = 'Left'
        } else if (info.leans === 'r') {
          style = {backgroundColor: 'rgba(250,0,0,0.3)'};
          leansText = 'Right';
        }
        const sum = this.props.campaigns.contributions.reduce(function(acc, val) {
          return acc + val.total_amount;
        }, 0);
        return (
            <div className="campaigns-campaign-info-block" style={style}>
              <p>Campaign Name: {info.name}</p>
              <p>Seems to Lean: {leansText}</p>
              <p>Total Raised: {sum}</p>
            </div>
        );
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    campaigns: state.campaigns,
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
)(CampaignInfoBlock);
