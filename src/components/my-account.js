import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../firebase';
import LogoutForm from './logout-form';

class MyAccount extends Component {

render() {
    return (
      <div className="user-profile">
        <h1>Mój profil</h1>
        <h3>Nazwa użytkownika: {this.props.userProfile.username}</h3>
        <h3>Adres e-mail: {this.props.userProfile.email}</h3>
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
