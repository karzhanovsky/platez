import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyAccount from '../components/my-account';
import Guest from '../components/guest.js';

class Account extends Component {
  render() {
    return (
      this.props.user ? <MyAccount user={this.props.user} userProfile={this.props.userProfile} /> : <Guest register={this.props.register} />
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
