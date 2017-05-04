import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import $ from 'jquery';

export class CampaignPage extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestACampaign({campaignID: this.props.params.campaignID})
  }

    cellID(theCell, that){
        that.style = {
            backgroundColor: 'transparent',
            zIndex: theCell,
            minWidth: '470px',
            minHeight: '38px',
            maxHeight: '76px',
            marginRight: '-470px',
            position: 'absolute',
            content: `${theCell}`
        };
        let that2 = this;
        that.onClick = (function(){
            setTimeout(() => {
                let cell = $(`td[style*="z-index: ${theCell}"]`)
                $.each(cell, (i, el) => {
                    if(el.style['z-index'] === theCell.toString()){
                        let row = $(el).parent();
                        let theHtml = row[0].innerHTML;
                        row[0].innerHTML = `<a style='z-index: ${theCell + 1}; position: absolute; opacity: 0.2; min-height: 38px; min-width: 470px;' id="${theCell}-link" href="/contributors/${theCell}">${theHtml}</a>`
                    }
                })
            }, 1000)
        })();
        that.title = theCell;
        return `${theCell}`;
    }

  cellColor(cell, that){
      let color;
      if(cell > 1){
          color = 'rgba(0,0,250, 0.3)';
      } else if (cell < -1){
          color = 'rgba(250,0,0, 0.3';
      } else {
          color = 'rgba(77,77,77, 0.3'
      }
      that.style = {
          backgroundColor: color,
          minWidth: '470px',
          minHeight: '38px',
          maxHeight: '76px',
          marginLeft: '-470px',
          position: 'absolute'
      };
      // this.setState({
      //     cellMap: cellMap
      // });
      return <div>{cell}</div>;
  }

  render() {
    if (this.props.campaigns.campaigns.donors){
        let that = this;
        return (
            <div className="campaigns-campaign-page">
              <h1>{this.props.campaigns.campaigns.donors[0].Name}</h1>
              <BootstrapTable data={this.props.campaigns.campaigns.donors} striped={true} hover={true} pagination={true}>
                <TableHeaderColumn dataField="contributor_id" isKey={true} dataFormat={function(cell){
                    that.cellID(cell, this);
                }} dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="full_name" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="Amount" dataSort={true}>Amount</TableHeaderColumn>
                <TableHeaderColumn dataField="contributor_score" dataFormat={function(cell){
                    that.cellColor(cell, this);
                }} dataSort={true}>Leans</TableHeaderColumn>
              </BootstrapTable>
            </div>
        );
    } else {
        return (
            <div className="campaigns-campaign-page">

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
)(CampaignPage);
