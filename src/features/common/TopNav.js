import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link, Router } from 'react-router';
import $ from 'jquery';

export class TopNav extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    componentDidMount(){

    }

  render() {
    return (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">DataShark</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">

                    <li className={`nav-item  waves-effect waves-light ${window.location.pathname === "/" ? 'active' : ''}`}>
                        <Link className="nav-link waves-effect waves-light" to="/">Home </Link>
                    </li>
                    <li className={`nav-item waves-effect waves-light  ${window.location.pathname === "/campaigns" ? 'active' : ''}`}>
                        <Link className="nav-link waves-effect waves-light" to="/campaigns">Campaigns </Link>
                    </li>
                    <li className={`nav-item waves-effect waves-light  ${window.location.pathname === "/contributors" ? 'active' : ''}`}>
                        <Link className="nav-link waves-effect waves-light" to="/contributors">Contributors</Link>
                    </li>
                    <li className="dropdown"
                        onMouseOver={e => $('#district-dropdown').show()}
                        onMouseOut={e => $('#district-dropdown').hide()}
                    >
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Districts <b className="caret"></b></a>
                        <ul className="dropdown-menu" id="district-dropdown">
                            {districtsList()}
                        </ul>
                    </li>
                    <li className="nav-item waves-effect waves-light">
                        <Link className="nav-link waves-effect waves-light" to="https://vimeo.com/album/4578100" target="_blank">Help Videos</Link>
                    </li>
                    <li className="nav-item waves-effect waves-light">
                        <Link className="nav-link waves-effect waves-light" to="https://squareup.com/store/paul-oliva" target="_blank">Donate</Link>
                    </li>
                    <li className="nav-item waves-effect waves-light">
                        <a className="nav-link waves-effect waves-light" target="_blank" href="/privacy">Privacy</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    campaigns: state.campaigns,
    contributors: state.contributors
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
)(TopNav);

function districtsList() {
    let numbers = [];
    for(let i = 1; i < 41; i++){
        numbers.push(i);
    }
    return numbers.map(el => (<li><a href={`/district/${el}`}>District {el}</a></li>) )
}
