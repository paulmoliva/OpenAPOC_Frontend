import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {requestSearch} from '../common/redux/requestSearch';
import {clearSearchResults} from '../common/redux/clearSearchResults';
import { Link } from 'react-router';
import $ from 'jquery';



export class DefaultPage extends Component {
  constructor(props){
      super(props);
      this.state = {
          search: '',
          searchDelayTime: null
      };
      this.searchContributors = this.searchContributors.bind(this);
  }
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  searchContributors(e){
      const userInput = $('.bigSearch').val()
      clearTimeout(this.state.searchDelayTimer);
      if (!userInput.length) return this.props.actions.clearSearchResults();
      this.setState({searchArgs: {
          model: 'contributors',
          search: $('.bigSearch').val()
      }});
      this.setState({
          searchDelayTimer: setTimeout(() => {
              this.props.actions.requestSearch(this.state.searchArgs)
          }, 250)
      });
  }

  componentDidMount(){
    // this.props.actions.requestContributors();
  }

    componentWillUnmount(){
        this.props.actions.clearContributors();
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
        <form>
            <input className="bigSearch" onKeyUp={this.searchContributors} type="text" placeholder="Search for Individual or Organizational Contributors"/>
            {
                (this.props.common.results.length) ?
                    (<ul className="results">
                        {this.props.common.results.map(el => (
                            <li style={{backgroundColor: el.score > 1 ? 'rgba(0,0,250, 0.3)' : el.score < -1 ? 'rgba(250,0,0,0.3)': 'rgba(0,0,0,0.3)'}}>
                            <Link to={`/contributors/${el.id}`}>{el.full_name}</Link>
                            </li>
                        ))}
                    </ul>) : ''
            }
        </form>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    contributors: state.contributors
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, requestSearch: requestSearch, clearSearchResults: clearSearchResults }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
