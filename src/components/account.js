import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateAccount from './create-account';

class Account extends Component {
  render() {
    return (
      this.props.user ? <p>MyAccount</p> : <CreateAccount />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account);
