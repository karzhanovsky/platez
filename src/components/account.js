import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyAccount from './my-account';
import CreateAccount from './create-account';

class Account extends Component {
  render() {
    return (
      this.props.user ? <MyAccount /> : <CreateAccount />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account);
