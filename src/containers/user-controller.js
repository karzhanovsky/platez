import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn } from '../actions';
import { auth , firebase} from '../firebase';

import Guest from '../components/guest';
import LogoutForm from '../components/logout-form';

class UserController extends Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.props.logIn(authUser);
    });
  }

  sideNavHandler() {
    let sideNav = document.querySelector(".side-nav");
    let body = document.querySelector("body");
    sideNav.style.marginLeft = "0";
    body.addEventListener("click", function() {
      if (!sideNav.contains(event.target)) {
        sideNav.style.marginLeft = "-300px"
      }
    })
  }

  render() {
    //console.log(this.props.user);
    return (
        <div className="side-nav">
          <button className="nav-button" onClick={this.sideNavHandler}></button>
        {this.props.user ? <LogoutForm /> : <Guest />}
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserController);
