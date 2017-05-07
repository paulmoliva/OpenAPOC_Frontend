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
        return (
            <div className="campaigns-campaign-info-block">
              <p>Campaign Name: {info.name}</p>
              <p>Leans: {info.leans.toUpperCase()}</p>
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
