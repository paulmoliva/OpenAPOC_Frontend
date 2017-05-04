import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import $ from 'jquery';

export class CampaignPage extends Component {
  static propTypes = {
    campaigns: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    this.props.actions.requestACampaign({campaignID: this.props.params.campaignID})
  }

    cellID(theCell, that){
        that.style = {
            zIndex: theCell
        };
        that.onClick = (function(){
            setTimeout(() => {
                let cell = $(`td[style*="z-index: ${theCell}"]`)
                $.each(cell, (i, el) => {
                    if(el.style['z-index'] === theCell.toString()){
                        let row = $(el).parent();
                        $(el).remove();
                        $(`th[data-field="contributor_id"]`).remove()
                        let theHtml = row[0].innerHTML;
                        row[0].innerHTML = `<a style='z-index: ${theCell + 1}; position: absolute; opacity: 0.2; min-height: 38px; min-width: 300px;' id="${theCell}-link" href="/contributors/${theCell}">${theHtml}</a>`
                    }
                })
            }, 250)
        })();
        that.title = theCell;
        return `${theCell}`;
    }

  render() {
      const options = {
          page: 1,  // which page you want to show as default
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
          paginationPosition: 'both'  // default is bottom, top and both is all available
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          // hidePageListOnlyOnePage: true > Hide the page list if only one page.
      };
    if (this.props.campaigns.campaigns.donors){
        function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
            // fieldValue is column value
            // row is whole row object
            // rowIdx is index of row
            // colIdx is index of column

            let color;
            if(row.contributor_score > 1){
                color = 'blue';
            } else if (row.contributor_score < -1){
                color = 'red';
            } else {
                color = 'grey'
            }
            let add = '';
            if (fieldValue === row.full_name) {
                add = ' three'
            } else if (fieldValue === row.Amount){
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
            <div className="campaigns-campaign-page">
              <h1>{this.props.campaigns.campaigns.donors[0].Name}</h1>
              <BootstrapTable
                  headerStyle={ { width: '900px' } }
                  bodyStyle={ { width: '900px' } }
                  data={this.props.campaigns.campaigns.donors}
                  striped={true}
                  hover={true}
                  pagination={true}
                  options={options}
              >
                <TableHeaderColumn dataField="contributor_id" className='zero' isKey={true} dataFormat={function(cell){
                    that.cellID(cell, this);
                }}></TableHeaderColumn>
                <TableHeaderColumn columnClassName={columnClassNameFormat} dataField="full_name" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn columnClassName={columnClassNameFormat} dataField="Amount" dataSort={true}>Amount</TableHeaderColumn>
                <TableHeaderColumn columnClassName={columnClassNameFormat} dataField="contributor_score" dataSort={true}>Leans</TableHeaderColumn>
              </BootstrapTable>
            </div>
        );
    } else {
        return (
            <div className="campaigns-campaign-page">

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
