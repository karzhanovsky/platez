import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyAccount from '../components/my-account';
import CreateAccount from '../components/create-account';

class Account extends Component {
  render() {
    return (
      this.props.user ? <MyAccount user={this.props.user} userProfile={this.props.userProfile} /> : <CreateAccount />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userProfile: state.userProfile,
  }
}

export default connect(mapStateToProps)(Account);
