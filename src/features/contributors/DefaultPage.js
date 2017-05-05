import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router';

export class DefaultPage extends Component {
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestContributors();
  }

  render() {
    if (this.props.contributors.contributors.length){
        const options = {
            page: 0,  // which page you want to show as default
            sizePerPageList: [ {
                text: '50', value: 50
            }, {
                text: '100', value: 100
            }, {
                text: 'All', value: this.props.contributors.contributors.length
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
            defaultSortName: 'score',  // default sort column name
            defaultSortOrder: 'desc',  // default sort order
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            // hidePageListOnlyOnePage: true > Hide the page list if only one page.
        };
        function columnClassNameFormat(cell, row, rowIdx, colIdx) {
            // fieldValue is column value
            // row is whole row object
            // rowIdx is index of row
            // colIdx is index of column
            if (row.score > 1) {
                return 'blue'
            } else if (row.score < -1) {
                return 'red'
            } else return 'grey'
        }
        return(
          <div className="contributors-default-page">
            <BootstrapTable
                data={this.props.contributors.contributors}
                hover={true}
                pagination={true}
                options={options}
                headerStyle={ { width: '900px' } }
                bodyStyle={ { width: '850px', marginLeft: '25px' } }
            >
              <TableHeaderColumn dataField="id" isKey={true}
                                 columnClassName={columnClassNameFormat}
                                 dataAlign="center"
                                 hidden>ID</TableHeaderColumn>
              <TableHeaderColumn
                  dataFormat={function(cell, row){
                      return <Link to={`/contributors/${row.id}`}>{cell.slice(0, 54)}</Link>
                  }}
                  filter={ { type: 'TextFilter', delay: 1000 } } dataField="full_name" columnClassName={columnClassNameFormat} dataSort={true}>Name</TableHeaderColumn>
              <TableHeaderColumn
                  columnClassName={columnClassNameFormat}
                  dataField="score"
                  filter={ {
                      type: 'NumberFilter',
                      delay: 1000,
                      numberComparators: [ '=', '>', '<=' ]
                  }}
                  dataSort={true}>Lean Score</TableHeaderColumn>
            </BootstrapTable>
          </div>
          )
    }
    return (
      <div className="contributors-default-page">
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
)(DefaultPage);
