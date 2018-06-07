import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn, fetchProfile } from '../actions';
import { auth, db, firebase} from '../firebase';

import Guest from '../components/guest';
import Account from './account.js';
import Navigation from '../components/navigation.js';

class UserController extends Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.props.logIn(authUser);
      if(authUser) {
        db.ref("/users").child(authUser.uid).once("value", snapshot => {
          this.props.fetchProfile(snapshot.val());
        })
      }
    });
  }

  sideNavHandler() {
    let sideNav = document.querySelector(".side-nav");
    let body = document.querySelector("body");
    let overlay = document.querySelector("#overlay");
    sideNav.style.marginLeft = "0";
    overlay.style.visibility = "visible";
    overlay.style.opacity = 1;
    body.addEventListener("click", function() {
      if (!sideNav.contains(event.target) || event.target.className == "navi-link") {
        sideNav.style.marginLeft = "-200px";
        overlay.style.visibility = "hidden";
        overlay.style.opacity = 0;
      }
    })
  }

  render() {
    return (
        <div className="side-nav">
          <button className="nav-button" onClick={this.sideNavHandler}></button>
        {this.props.user ? <Account /> : <Guest />}
        <Navigation />
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userProfile: state.userProfile,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logIn:logIn, fetchProfile:fetchProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserController);
