import React, { Component } from 'react';
import { auth, db } from '../firebase';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      avatarURL: '',
      usernameAvailable: true,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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
        username: '',
      })
    })
    .catch(error => {
      console.log(error);
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

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
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

  render() {
    return (
      <div className="register">
        <h1>Załóż konto</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
          type="email"
          value={this.state.email}
          onChange={this.onEmailChange}
          placeholder="Email"
          />
          <input
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
          placeholder="Hasło"
          />
          <input
          type="text"
          value={this.state.username}
          onChange={this.onUsernameChange}
          placeholder="Nazwa użytkownika"
          />
          {this.state.username.length > 0 &&
            <p>
            Nazwa {this.state.username} jest {this.state.usernameAvailable ?
            <span className="usernameAvailable">wolna</span> :
            <span className="usernameUnavailable">zajęta</span>}
            </p>
          }
          <button type="submit">Załóż konto</button>
        </form>
      </div>
    )
  }
}

export default CreateAccount;
