import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router'
import LoadingSpinner from '../common/LoadingSpinner';


export class DefaultPage extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestCampaigns();
  }

    componentWillUnmount(){
        this.props.actions.clearCampaigns();
    }

  render() {
      const options = {
          page: 0,  // which page you want to show as default
          sizePerPageList: [ {
              text: '50', value: 50
          }, {
              text: '100', value: 100
          }, {
              text: 'All', value: this.props.campaigns.contributions.length
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
    if(this.props.campaigns.contributions.length){
        function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
            // fieldValue is column value
            // row is whole row object
            // rowIdx is index of row
            // colIdx is index of column
            let color = '';
            if(row.leans === 'l' ){
                color = ' blue';
            } else if (row.leans === 'r'){
                color = ' red';
            } else {
                color = ' grey'
            }
            color += ' half';
            return color;
        }
        const leanTypes = {l: 'Left', r: 'Right'};
      return (
          <BootstrapTable
              data={this.props.campaigns.contributions}
              hover={true}
              pagination={true}
              options={options}
              headerStyle={ { width: '900px' } }
              bodyStyle={ { width: '900px'} }
          >
            <TableHeaderColumn dataField="id" isKey={true}
               columnClassName={columnClassNameFormat}
              dataAlign="center"
              dataSort={true}
              hidden>ID</TableHeaderColumn>
            <TableHeaderColumn
                dataFormat={function(cell, row){
                    return <Link to={`/campaigns/${row.id}`}>{cell.slice(0, 54)}</Link>
                }}
                filter={ { type: 'TextFilter', delay: 1000 } } dataField="name" columnClassName={columnClassNameFormat} dataSort={true}>Campaign Name</TableHeaderColumn>
            <TableHeaderColumn
                columnClassName={columnClassNameFormat}
                filter={ { type: 'SelectFilter', options: leanTypes }}
                dataField="leans"
                dataFormat={cell => {
                    if (cell === 'l') {
                        return 'Left'
                    } else if (cell === 'r') {
                        return 'Right'
                    } else return '-'
                }}
            dataSort={true}>Campaign Leans</TableHeaderColumn>
          </BootstrapTable>
      )
    } else
    return (
      <div className="campaigns-default-page standardPage">
        <LoadingSpinner/>
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
