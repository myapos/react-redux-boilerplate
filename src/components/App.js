import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import '../css/css.styl'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }
  render () {
    return (
    <div id="container"> 
      Hello World!!!! 
    </div>);
  }
}

App.propTypes = {
};

export default connect(
  state => state,
  actions
)(App);