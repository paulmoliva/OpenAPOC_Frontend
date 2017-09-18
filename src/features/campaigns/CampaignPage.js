import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { browserHistory, Link } from 'react-router'
import {CampaignInfoBlock} from './';
import LoadingSpinner from '../common/LoadingSpinner';
import $ from 'jquery';



export class CampaignPage extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestACampaign({campaignID: this.props.params.campaignID})
    window.theRouter = browserHistory;
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
          paginationSize: 19,  // the pagination bar size.
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
          defaultSortName: 'total_amount',  // default sort column name
          defaultSortOrder: 'desc'  // default sort order
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
    if (!this.props.campaigns.loading){
        function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
            // fieldValue is column value
            // row is whole row object
            // rowIdx is index of row
            // colIdx is index of column
            if(fieldValue === row.contributor_id){
                return 'zero'
            }
            let color = '';
            if(row.contributor_score > 1){
                color = 'blue';
            } else if (row.contributor_score < -1){
                color = 'red';
            } else {
                color = 'grey'
            }
            let add = '';

            return color;
        }
        const selectOptions = {1: "Filter blanks"};
        return (
            <div className="campaigns-campaign-page standardPage">
              <CampaignInfoBlock />
              <BootstrapTable
                  headerStyle={ { width: '100%' } }
                  bodyStyle={ { width: '100%' } }
                  data={this.props.campaigns.contributions}
                  hover={true}
                  pagination={true}
                  options={options}
              >
                <TableHeaderColumn
                    dataFormat={function(cell, row){
                        return cell
                    }}
                    dataField="van_id" isKey={true}
                    export={true}
                hidden>
                    ID</TableHeaderColumn>
                <TableHeaderColumn
                    dataFormat={
                      (cell, row) => {
                        if(row.contributor_id)
                          return <Link to={`/contributors/${row.contributor_id}`}>{cell}</Link>;
                        else {
                          return {cell}
                        }
                      }
                  }
                    filter={ { type: 'TextFilter', delay: 1000 } }
                    columnClassName={columnClassNameFormat}
                    dataField="full_name"
                    dataSort={true}
                    export={true}
                >
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn
                    filter={ { type: 'NumberFilter', delay: 1000, numberComparators: ['=', '>', '<'] } }
                    columnClassName={columnClassNameFormat}
                    dataField="Report_Year"
                    dataSort={true}
                    dataFormat={cell => {
                        return cell ? parseInt(cell) : null;
                    }}
                    export={true}
                >
                    Year
                </TableHeaderColumn>
                <TableHeaderColumn columnClassName={columnClassNameFormat}
                   dataField="total_amount"
                   dataSort={true}
                   filter={ {
                       type: 'NumberFilter',
                       delay: 1000,
                       numberComparators: [ '=', '>', '<=' ]
                   }}
                   export={true}
                >
                   Amount
               </TableHeaderColumn>
                <TableHeaderColumn
                    columnClassName={columnClassNameFormat}
                    dataField="contributor_score"
                    dataSort={true}
                    filter={ {
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}
                    export={true}
                >
                    Donor Score
                </TableHeaderColumn><TableHeaderColumn
                    columnClassName={columnClassNameFormat}
                    dataField="avg_contribution"
                    dataSort={true}
                    filter={ {
                        type: 'NumberFilter',
                        delay: 1000,
                        numberComparators: [ '=', '>', '<=' ]
                    }}
                    export={true}
              >
                    Avg Contribution
                </TableHeaderColumn>
                  <TableHeaderColumn
                      dataField="PreferredPhone"
                      columnClassName={columnClassNameFormat}
                      filter={ { type: 'SelectFilter', options: selectOptions } }
                      filterValue={ (cell, row) => {
                          if (row.PreferredPhone === '') {
                              return false;
                          } else {
                              return $('.select-filter').val();
                          }
                      }}
                      dataFormat={cell => {
                          return 'Not available!';
                      }}
                      export={false}
                  >
                      Phone
                  </TableHeaderColumn>
                  <TableHeaderColumn
                      dataField="district"
                      dataSort={true}
                      columnClassName={columnClassNameFormat}
                      filter={ {
                          type: 'NumberFilter',
                          delay: 1000,
                          numberComparators: [ '=', '>', '<=' ]
                      }}
                      export={true}
                  >
                      District
                  </TableHeaderColumn>
              </BootstrapTable>
            </div>
        );
    } else {
        return (
            <div className="campaigns-campaign-page standardPage">
              <LoadingSpinner/>
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
