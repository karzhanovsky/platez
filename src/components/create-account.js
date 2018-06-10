import React, { Component } from 'react';
import { auth, db } from '../firebase';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      avatarURL: '',
      usernameAvailable: false,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.isUsernameAvailable = this.isUsernameAvailable.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();

    auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      db.ref("/users").child(user.user.uid).set({
        email: user.user.email,
        username: this.state.username,
      })
      db.ref("usernames").child(this.state.username).set({
        uid: user.user.uid,
      })
      this.setState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
      })
    })
    .catch(error => {
      let warnEmail = document.querySelector(".form-warn-email");
      let warnPassword = document.querySelector(".form-warn-password");

      switch(error.code) {
        case 'auth/email-already-in-use':
          warnEmail.style.display = "block";
          break;
        case 'auth/weak-password':
          warnPassword.style.display = "block";
        default:
          console.log(error);
      }
      //console.log(error);
    })
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  onPasswordConfirmChange(event) {
    this.setState({
      passwordConfirm: event.target.value
    })
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value,
      usernameAvailable: false,
    });
    this.isUsernameAvailable(event.target.value);
  }

  isUsernameAvailable(username) {
    let that = this;
    if(username !== ''){
    db.ref("/usernames").child(username).on('value', function(snapshot) {
      if (snapshot.val() !== null) {
        that.setState({
          usernameAvailable: false,
        })
      } else {
        that.setState({
          usernameAvailable: true,
        })
      }
    })
    }
  }

  formValidate() {
    let email = this.state.email;
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.usernameAvailable && pattern.test(email) && this.state.password === this.state.passwordConfirm) {
      return true;
    }
  }

  render() {
    return (
      <div className="register">
        <h1>Załóż konto</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
          id="input-email"
          type="email"
          value={this.state.email}
          onChange={this.onEmailChange}
          placeholder="Email"
          />
          <div className="form-warn-email">Podany adres e-mail już istnieje.</div>
          <input
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
          placeholder="Hasło"
          />
          <div className="form-warn-password">Hasło musi się składać z co najmniej 6 znaków.</div>
          <input
          type="password"
          value={this.state.passwordConfirm}
          onChange={this.onPasswordConfirmChange}
          placeholder="Potwierdź hasło"
          />
          <input
          type="text"
          value={this.state.username}
          onChange={this.onUsernameChange}
          placeholder="Nazwa użytkownika"
          />
          {this.state.username.length > 0 &&
            <p className="usernameAvailability">
            Nazwa {this.state.username} jest {this.state.usernameAvailable ?
            <span className="usernameAvailable">wolna</span> :
            <span className="usernameUnavailable">zajęta</span>}
            </p>
          }
          <button disabled={!this.formValidate()} type="submit">Załóż konto</button>
        </form>
      </div>
    )
  }
}

export default CreateAccount;
