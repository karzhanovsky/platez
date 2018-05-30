import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../firebase';
import LogoutForm from './logout-form';

class MyAccount extends Component {

render() {
    return (
      <div>
        <h1>Mój profil</h1>
        <p>Username:{this.props.userProfile.username}</p>
        <LogoutForm />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userProfile: state.userProfile
  }
}

export default connect(mapStateToProps)(MyAccount);
