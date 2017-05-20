import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export class DistrictPage extends Component {
  static propTypes = {
    voters: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.requestDistrictVoters({district: this.props.router.params.district_id })
  }

  render() {
      const options = {
          page: 0,  // which page you want to show as default
          sizePerPageList: [ {
              text: '50', value: 50
          }, {
              text: '100', value: 100
          }, {
              text: 'All', value: this.props.voters.voters.length
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
          defaultSortName: 'precinct',  // default sort column name
          defaultSortOrder: 'asc',  // default sort order
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
    let content;
    if(!this.props.voters.voters.length) {
      content = 'loading';
    } else {
      content = (
          <BootstrapTable
              data={this.props.voters.voters}
              hover={true}
              pagination={true}
              options={options}
              headerStyle={ { width: '1100px' } }
              bodyStyle={ { width: '1100px'} }
              exportCSV
          >
            <TableHeaderColumn dataField="id" isKey={true}
                               // columnClassName={columnClassNameFormat}
                               dataAlign="center"
                               dataSort={true}
                               hidden>ID</TableHeaderColumn>
            <TableHeaderColumn
                filter={ { type: 'TextFilter', delay: 1000 } }
                dataField="full_name"
                dataSort={true}
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
                filter={ { type: 'TextFilter', delay: 1000 } }
                dataField="RESIDENCE_ADDRESS"
                dataSort={true}
            >
              RESIDENCE ADDRESS
            </TableHeaderColumn>
            <TableHeaderColumn
                filter={ { type: 'TextFilter', delay: 1000 } }
                dataField="RESIDENCE_ZIP"
                dataSort={true}
            >
              RESIDENCE ZIP
            </TableHeaderColumn>
<TableHeaderColumn
                filter={ {
                    type: 'NumberFilter',
                    delay: 1000,
                    numberComparators: [ '=', '>', '<=' ]
                }}
                dataField="voter_score"
                dataSort={true}
            >
              Num Votes
            </TableHeaderColumn>

            <TableHeaderColumn
                dataField="precinct"
                dataSort={true}
                filter={ {
                    type: 'NumberFilter',
                    delay: 1000,
                    numberComparators: [ '=', '>', '<=' ]
                }}
            >
              Precinct
            </TableHeaderColumn>
            <TableHeaderColumn
               dataField="score"
               dataSort={true}
               filter={ {
                   type: 'NumberFilter',
                   delay: 1000,
                   numberComparators: [ '=', '>', '<=' ]
               }}
            >
              Donor Score
            </TableHeaderColumn>
          </BootstrapTable>
      )
    }
    return (
      <div className="voters-district-page">
          {content}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    voters: state.voters,
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
)(DistrictPage);
