import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn } from '../actions';
import { auth , firebase} from '../firebase';

import LoginForm from '../components/login-form';
import LogoutForm from '../components/logout-form';

class CurrentUser extends Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.props.logIn(authUser);
    })
  }

  render() {
    return this.props.user ? <LogoutForm /> : <LoginForm />
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logIn:logIn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
