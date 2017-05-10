import React, { Component, PropTypes } from 'react';
const Masonry = require('react-masonry-component');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {requestSearch} from '../common/redux/requestSearch';
import {clearSearchResults} from '../common/redux/clearSearchResults';
import { Link } from 'react-router';
import $ from 'jquery';
import LoadingSpinner from '../common/LoadingSpinner';



export class DefaultPage extends Component {
  constructor(props){
      super(props);
      this.state = {
          search: '',
          searchDelayTime: null,
          submitted: false
      };
      this.searchContributors = this.searchContributors.bind(this);
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  searchContributors(e){
      if(this.state.submitted && this.props.common.loading) return;
      const userInput = $('.bigSearch').val();
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

  handleSearchSubmit(e){
    this.setState({submitted: true});
    clearTimeout(this.state.searchDelayTimer);
    this.props.actions.clearSearchResults();
    e.preventDefault();
    const searchTerm = $('.bigSearch').val();
    const userInput = searchTerm;
    this.props.actions.requestSearch({
      model: 'contributors',
      search: userInput,
      formSubmit: true
    })
  }

  componentDidMount(){
    this.props.actions.clearSearchResults();
  }

  componentWillUnmount(){
    this.props.actions.clearContributors();
    this.props.actions.clearSearchResults();
  }

  render() {
    let table = null;
    let masonryOptions = {
        columnWidth: 110,
        gutter: 8,
        itemSelector: 'li'
    };
            if (this.state.submitted && this.props.common.contributors[0].id !== 0){
        const options = {
            page: 0,  // which page you want to show as default
            sizePerPageList: [ {
                text: '50', value: 50
            }, {
                text: '100', value: 100
            }, {
                text: 'All', value: this.props.common.contributors.length
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
        table =(
            <BootstrapTable
                data={this.props.common.contributors || [{
                  id: 0,
                  full_name: 'No Results',
                  score: '-1'
                }]}
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
          )
    }
    return (
      <div className="contributors-default-page standardPage form-group">
        {!this.state.submitted ? (<form onSubmit={this.handleSearchSubmit}>
            <input className="bigSearch form-control"
                   id="focusedInput"
                   onKeyUp={this.searchContributors}
                   type="text" placeholder="Search for Individual or Organizational Contributors"/>
            {
                (this.props.common.results.length && !this.state.submitted) ?
                    (<div>
                        {/*<div className="mask" onClick={e => {this.props.actions.clearSearchResults();console.log(e.currentTarget); $('.bigSearch').val(''); }} />*/}

                        <Masonry
                            className={'results'} // default ''
                            elementType={'ul'} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {this.props.common.results.map(el => (
                                <li style={{zIndex: 2, backgroundColor: el.score > 1 ? 'rgba(0,0,250, 0.3)' : el.score < -1 ? 'rgba(250,0,0,0.3)': 'rgba(0,0,0,0.3)'}}>
                                    <Link to={`/contributors/${el.id}`}>{el.full_name.slice(0,50)}</Link>
                                    <p>Score: {el.score}</p>
                                    <p>Total: {el.total}</p>
                                </li>
                            ))}
                        </Masonry>
                    </div>
                    ) : ''
            }
        </form>) : ''}
        {((this.state.submitted && this.props.common.loading) ? <LoadingSpinner/> : '')}
        {(table && this.props.common.contributors.length) ? table : ''}
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
