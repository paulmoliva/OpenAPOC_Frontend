import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ContributorInfoBlock extends Component {
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.addressMapper = this.addressMapper.bind(this);
  }

  componentDidMount() {
      // this.props.actions.requestContributorActivistCodes({id: this.props.contributor_id});
      // this.props.actions.requestContributorSurveyResponses({id: this.props.contributor_id});
  }

  activistCodesTableBody() {
      const codes = this.props.contributors.activist_codes || [];
      if(codes) {
          return codes.map( code => {
              return (
                  <tr>
                      <td>Not Available!</td>
                      <td>Not Available!</td>
                      <td>Not Available!</td>
                  </tr>
              )
          })
      } else return <strong>Loading Activist Codes</strong>

  }

  surveyResponsesTableBody() {
      const codes = this.props.contributors.surveyResponses || [];
      const responsesBody = codes.map( code => {
          return (
                    <tr>
                        <td>Not Available!</td>
                        <td>Not Available!</td>
                        <td>Not Available!</td>
                    </tr>
          )
      });
      return (
          <table>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date</th>
              </tr>
              {responsesBody}
          </table>
      )
  }

  addressMapper() {
    if(this.props.contributors.contributions.length){
      return (
        <div>
          <p><strong>Address:</strong> {this.props.contributors.contributions[0].Address} {this.props.contributors.contributions[0].City}, {this.props.contributors.contributions[0].State} {this.props.contributors.contributions[0].Zip}</p>
          <iframe
              width="600"
              height="150"
              frameborder="0" style={{border:0}}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCqJ6Xp90xxiBHWmMKkZuiOEtK-fbTRZGo&q=${this.props.contributors.contributions[0].Address}+${this.props.contributors.contributions[0].Zip}`} allowfullscreen>
          </iframe>
        </div>
      )
    }
  }

  render() {
    if(this.props.contributors){
      const the_contributor = this.props.contributors.contributor;
      return (
        <div className="contributors-contributor-info-block">
          <table>
          <tr>
          <th>Contributor Name</th>
          <th>Lean Score</th>
          <th>Total Amount</th>
          <th>Avg Gift</th>
          <th># Contributions</th>
          </tr>
          <tr>
            <td> {the_contributor.full_name}</td>
            <td> {the_contributor.score}</td>
            <td> ${the_contributor.total}</td>
            <td> ${the_contributor.avg_donation}</td>
            <td> {the_contributor.count}</td>
          </tr>
          </table>
          <iframe src={`https://duckduckgo.com/search.html?prefill=${the_contributor.full_name} Alaska`} style={{overflow:'hidden',margin:'0',padding:'6px',width:'420px',height:"52px"}} frameborder="0"></iframe>
          {this.addressMapper.bind(this)()}
        </div>
      );
    } else return <div/>
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
)(ContributorInfoBlock);
