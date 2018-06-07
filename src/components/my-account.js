import React, { Component } from 'react';
import LogoutForm from './logout-form';

class MyAccount extends Component {

render() {
    return (
      <div className="user-profile">
        <h1>{this.props.userProfile.username}</h1>
        <h3>{this.props.userProfile.email}</h3>
        <LogoutForm />
      </div>
    )
  }
}

export default MyAccount;
