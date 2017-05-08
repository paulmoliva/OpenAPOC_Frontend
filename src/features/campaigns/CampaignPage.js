import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { browserHistory, Link } from 'react-router'
import {CampaignInfoBlock} from './';
import LoadingSpinner from '../common/LoadingSpinner';



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
            if (fieldValue === row.full_name) {
                add = ' three link'
            } else if (fieldValue === row.total_amount){
                add = ' three'
            } else if (fieldValue === row.contributor_score) {
                add = ' three'
            } else {
                add = ' zero'
            }
            return color + add;
        }
        let that = this;
        return (
            <div className="campaigns-campaign-page standardPage">
              <CampaignInfoBlock />
              <BootstrapTable
                  headerStyle={ { width: '1100px' } }
                  bodyStyle={ { width: '1100px' } }
                  data={this.props.campaigns.contributions}
                  hover={true}
                  pagination={true}
                  options={options}
              exportCSV>
                <TableHeaderColumn
                    dataFormat={function(cell, row){
                        return cell
                    }}
                    dataField="contributor_id" isKey={true}
                hidden>
                    ID</TableHeaderColumn>
                <TableHeaderColumn
                    dataFormat={(cell, row) => <Link to={`/contributors/${row.contributor_id}`}>{cell}</Link>}
                    filter={ { type: 'TextFilter', delay: 1000 } } columnClassName={columnClassNameFormat} dataField="full_name" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn
                    filter={ { type: 'NumberFilter', delay: 1000, numberComparators: ['=', '>', '<'] } }
                    columnClassName={columnClassNameFormat}
                    dataField="Report_Year"
                    dataSort={true}
                    dataFormat={cell => {
                        return cell ? parseInt(cell) : null;
                    }}
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
                >
                    Leans
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
