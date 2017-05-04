import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import $ from 'jquery';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export class DefaultPage extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestCampaigns();
  }

  cellColor(cell, that){
    let color;
    if(cell === 'l'){
        color = 'rgba(0,0,250, 0.3)';
    } else if (cell === 'r'){
        color = 'rgba(250,0,0, 0.3';
    } else {
        color = 'rgba(77,77,77, 0.3'
    }
    let cellMap = {};
    cellMap[that.index] = {
        "index": that.index,
        "color": color
    };
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
      return cell;
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
                      row[0].innerHTML = `<a style='z-index: ${theCell + 1}; position: absolute; opacity: 0.2; min-height: 38px; min-width: 470px;' id="${theCell}-link" href="/campaigns/${theCell}">${theHtml}</a>`
                  }
              })
          }, 1000)
      })();
      that.title = theCell;
      return `${theCell}`;
  }

  render() {
      const options = {
          page: 1,  // which page you want to show as default
          sizePerPageList: [ {
              text: '50', value: 50
          }, {
              text: '100', value: 100
          }, {
              text: 'All', value: this.props.campaigns.campaigns.length
          } ], // you can change the dropdown list for size per page
          sizePerPage: 50,  // which size per page you want to locate as default
          pageStartIndex: 0, // where to start counting the pages
          paginationSize: 9,  // the pagination bar size.
          prePage: 'Prev', // Previous page button text
          nextPage: 'Next', // Next page button text
          firstPage: 'First', // First page button text
          lastPage: 'Last', // Last page button text
          prePageTitle: 'Go to previous', // Previous page button title
          nextPageTitle: 'Go to next', // Next page button title
          firstPageTitle: 'Go to first', // First page button title
          lastPageTitle: 'Go to Last', // Last page button title
          paginationShowsTotal: false,  // Accept bool or function
          paginationPosition: 'both'  // default is bottom, top and both is all available
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
    if(this.props.campaigns.campaigns.length){
      let that = this;
      return (
          <BootstrapTable data={this.props.campaigns.campaigns} striped={true} hover={true} pagination={true} options={options}>
            <TableHeaderColumn dataField="id" isKey={true} dataFormat={function(cell){
                that.cellID(cell, this);
            }} dataAlign="center" dataSort={true}>Campaign ID</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataFormat={cell => (cell.slice(0,54) + (cell.length > 54 ? '...' : ''))} dataSort={true}>Campaign Name</TableHeaderColumn>
            <TableHeaderColumn dataField="leans" dataFormat={function(cell){
                that.cellColor(cell, this);
            }}
            dataSort={true}>Campaign Leans</TableHeaderColumn>
          </BootstrapTable>
      )
    } else
    return (
      <div className="campaigns-default-page">
        campaigns
      </div>
    );
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
)(DefaultPage);
