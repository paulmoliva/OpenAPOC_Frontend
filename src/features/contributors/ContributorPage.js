import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router';

export class ContributorPage extends Component {
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestAContributor({id: this.props.params.id})
  }

    componentWillUnmount(){
        this.props.actions.clearContributors();
    }

  render() {
      const options = {
          page: 0,  // which page you want to show as default
          sizePerPageList: [ {
              text: '50', value: 50
          }, {
              text: '100', value: 100
          }, {
              text: 'All', value: this.props.contributors.contributor.length
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
          defaultSortName: 'Report_Year',  // default sort column name
          defaultSortOrder: 'desc',  // default sort order
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
      if(this.props.contributors.contributor.length){
          function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
              // fieldValue is column value
              // row is whole row object
              // rowIdx is index of row
              // colIdx is index of column
              let name;
              if (fieldValue === row.name) {
                  name = 'link'
              } else if (fieldValue === row.id) {
                  return ''
              } else {
                  name = ''
              }
              let color = '';
              if(row.lean === 'l' ){
                  color = ' blue';
              } else if (row.lean === 'r'){
                  color = ' red';
              } else {
                  color = ' grey'
              }
              return name + color ;
          }
          const leanTypes = {l: 'Left', r: 'Right'};
        return (
            <div className="contributors-contributor-page">
              <h1>Contributions by {this.props.contributors.contributor[0].full_name}</h1>
            <BootstrapTable
                data={this.props.contributors.contributor}
                hover={true}
                pagination={true}
                options={options}
                headerStyle={ { width: '900px' } }
                bodyStyle={ { width: '900px' } }
            >
              <TableHeaderColumn dataField="Result" isKey={true}
                                 columnClassName={columnClassNameFormat}
                                 dataAlign="center"
                                 hidden>ID</TableHeaderColumn>
              <TableHeaderColumn
                  dataFormat={function(cell, row){
                      return <Link to={`/campaigns/${row.campaign_id}`}>{cell.slice(0, 54)}</Link>
                  }}
                  filter={ { type: 'TextFilter', delay: 1000 } } dataField="Name" columnClassName={columnClassNameFormat} dataSort={true}>Campaign Name</TableHeaderColumn>
              <TableHeaderColumn filter={ { type: 'TextFilter', delay: 1000 } } columnClassName={columnClassNameFormat} dataField="Report_Year" dataSort={true}>Year</TableHeaderColumn>
              <TableHeaderColumn columnClassName={columnClassNameFormat}
                                 dataField="total_amount"
                                 dataSort={true}
                                 dataFormat={cell => cell.toString().trim()}
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
                  filter={ { type: 'SelectFilter', options: leanTypes }}
                  dataField="lean"
                  dataFormat={cell => {
                      if (cell === 'l') {
                          return 'Left'
                      } else if (cell === 'r') {
                          return 'Right'
                      } else return '-'
                  }}
                  dataSort={true}>Campaign Leans</TableHeaderColumn>
            </BootstrapTable>
            </div>
        )
      } else {
          return (
              <div className="contributors-contributor-page">
                <p>Loading.</p>
                <img src="http://i.imgur.com/XLJxE8S.gif" />
                <p>Please do not read this text.</p>
              </div>
          );
      }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    contributors: state.contributors,
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
)(ContributorPage);
