import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import $ from 'jquery';


export class DistrictPage extends Component {
  static propTypes = {
    voters: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = {
          exportType: 'phone'
      };
      this.handleExportChange = this.handleExportChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.requestDistrictVoters({district: this.props.router.params.district_id })
  }

  handleExportChange(e) {
      debugger;
    this.setState({
        exportType: e.target.value
    });
  }

  render() {
      const chartOptions = {
          // page: 0,  // which page you want to show as default
          sizePerPageList: [ {
              text: '50', value: 50
          }, {
              text: '100', value: 100
          }, {
              text: 'All', value: this.props.voters.voters.length
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
          defaultSortName: 'precinct',  // default sort column name
          defaultSortOrder: 'desc',  // default sort order
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
    let content;
    if(!this.props.voters.voters.length) {
      content = 'loading';
    } else {
        function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
            // fieldValue is column value
            // row is whole row object
            // rowIdx is index of row
            // colIdx is index of column
            let color = '';
            if(row.party === 'D'){
                color = 'blue';
            } else if (row.party === 'R'){
                color = 'red';
            } else {
                color = 'grey'
            }
            return color;
        }
        const options = {1: "Filter blanks"};
      content = (
          <BootstrapTable
              data={this.props.voters.voters}
              hover={true}
              pagination={true}
              options={chartOptions}
              headerStyle={ { width: '100%' } }
              bodyStyle={ { width: '100%'} }

              csvFileName={`district-${this.props.router.params.district_id}`}
          >
            <TableHeaderColumn
                dataField="VANID"
                isKey={true}
                // columnClassName={columnClassNameFormat}
                dataAlign="center"
                dataSort={true}
                hidden
                export={true}
            >
                ID
            </TableHeaderColumn>
            <TableHeaderColumn
                filter={ { type: 'TextFilter', delay: 1000 } }
                dataField="full_name"
                dataSort={true}
                columnClassName={columnClassNameFormat}
                export={true}
                dataFormat={function(cell, row){
                    return <a target="_blank" href={`/contributors/${row.VANID}`}>{cell.slice(0, 54)}</a>
                }}
            >
              Name
            </TableHeaderColumn>

            <TableHeaderColumn
                filter={ {
                    type: 'NumberFilter',
                    delay: 1000,
                    numberComparators: [ '=', '>', '<=' ]
                }}
                dataField="num_votes"
                dataSort={true}
                columnClassName={columnClassNameFormat}
                export={true}
            >
              # Votes
            </TableHeaderColumn>

            <TableHeaderColumn
                dataField="precinct"
                dataSort={true}
                filter={ {
                    type: 'NumberFilter',
                    delay: 1000,
                    numberComparators: [ '=', '>', '<=' ]
                }}
                columnClassName={columnClassNameFormat}
                export={true}
            >
              Precinct
            </TableHeaderColumn>
            <TableHeaderColumn
               dataField="donor_score"
               dataSort={true}
               filter={ {
                   type: 'NumberFilter',
                   delay: 1000,
                   numberComparators: [ '=', '>=', '<=' ]
               }}
               columnClassName={columnClassNameFormat}
               filterValue={ (cell, row) => {
                   if(row.donor_score === null){
                       return false;
                   } else {
                       return row.donor_score
                   }
               } }
               export={false}
            >
              Donor Score
            </TableHeaderColumn>
              <TableHeaderColumn
                  dataField="score_guess"
                  dataSort={true}
                  filter={ {
                      type: 'NumberFilter',
                      delay: 1000,
                      numberComparators: [ '=', '>=', '<=' ]
                  }}
                  columnClassName={columnClassNameFormat}
                  export={true}
              >
                  Score Guess
              </TableHeaderColumn>
              <TableHeaderColumn
                  dataField="avg_contribution"
                  dataSort={true}
                  filter={ {
                      type: 'NumberFilter',
                      delay: 1000,
                      numberComparators: [ '=', '>=', '<=' ]
                  }}
                  filterValue={ (cell, row) => {
                      if(row.avg_contribution === 0){
                          return false;
                      } else {
                          return row.avg_contribution
                      }
                  } }
                  columnClassName={columnClassNameFormat}
                  export={true}
              >
                  Avg Give
              </TableHeaderColumn>
              <TableHeaderColumn
                  dataField="num_contributions"
                  dataSort={true}
                  filter={ {
                      type: 'NumberFilter',
                      delay: 1000,
                      numberComparators: [ '=', '>=', '<=' ]
                  }}
                  columnClassName={columnClassNameFormat}
                  export={true}
              >
                  # Contributions
              </TableHeaderColumn>
              <TableHeaderColumn
                  filter={ { type: 'TextFilter', delay: 1000 } }
                  dataField="party"
                  dataSort={true}
                  columnClassName={columnClassNameFormat}
                  export={true}
              >
                  Party
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
