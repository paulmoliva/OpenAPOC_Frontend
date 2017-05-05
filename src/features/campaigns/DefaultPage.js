import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import $ from 'jquery';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router'


export class DefaultPage extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestCampaigns();
    window.theRouter = browserHistory;
  }

  cellID(theCell, that){
      that.style = {
          zIndex: theCell,
          maxWidth: '275px'
      };
      let that2 = this;
      that.onClick = (function(){
          setTimeout(() => {
              let cell = $(`td[style*="z-index: ${theCell}"]`)
              $.each(cell, (i, el) => {
                  if(el.style['z-index'] === theCell.toString()){
                      let row = $(el).parent();
                      let theHtml = row[0].innerHTML;
                      row[0].innerHTML = `<a style='z-index: ${theCell + 1}; position: absolute; opacity: 0.2; min-height: 38px; min-width: 323px; left: 551px; cursor: pointer;' id="${theCell}-link" onclick="window.theRouter.push('/campaigns/${theCell}')">${theHtml}</a>`
                  }
              })
          }, 1000)
      })();
      that.title = theCell;
      return `${theCell}`;
  }

  render() {
      const options = {
          page: 0,  // which page you want to show as default
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
          paginationPosition: 'both',  // default is bottom, top and both is all available
          defaultSortName: 'name',  // default sort column name
          defaultSortOrder: 'asc',  // default sort order
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
    if(this.props.campaigns.campaigns.length){
      let that = this;
        function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
            // fieldValue is column value
            // row is whole row object
            // rowIdx is index of row
            // colIdx is index of column
            let name;
            if (fieldValue === row.name) {
                name = 'link'
            } else if (colIdx === 0){
                name = 'small';
            } else {
                name = ''
            }
            let color = '';
            if(row.leans === 'l' ){
                color = ' blue';
            } else if (row.leans === 'r'){
                color = ' red';
            } else {
                color = ' grey'
            }
            return name + color + ' three';
        }
        const leanTypes = {l: 'Left', r: 'Right'};
      return (
          <BootstrapTable
              data={this.props.campaigns.campaigns}
              striped={true}
              hover={true}
              pagination={true}
              options={options}
              headerStyle={ { width: '900px' } }
              bodyStyle={ { width: '850px', marginLeft: '25px' } }
          >
            <TableHeaderColumn dataField="id" isKey={true} dataFormat={function(cell){
                that.cellID(cell, this);
                return cell;
            }}
               columnClassName={columnClassNameFormat}
              dataAlign="center"
              dataSort={true}>Campaign ID</TableHeaderColumn>
            <TableHeaderColumn filter={ { type: 'TextFilter', delay: 1000 } } dataField="name" columnClassName={columnClassNameFormat} dataFormat={cell => (cell.slice(0,54) + (cell.length > 54 ? '...' : ''))} dataSort={true}>Campaign Name</TableHeaderColumn>
            <TableHeaderColumn
                columnClassName={columnClassNameFormat}
                filter={ { type: 'SelectFilter', options: leanTypes, defaultValue: 'l' } }
                dataField="leans"
            dataSort={true}>Campaign Leans</TableHeaderColumn>
          </BootstrapTable>
      )
    } else
    return (
      <div className="campaigns-default-page">
          <p>Loading.</p>
          <img src="http://i.imgur.com/XLJxE8S.gif" />
          <p>Please do not read this text.</p>
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
