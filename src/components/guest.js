import React, { Component } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

class Guest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password)
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

  render() {
    let isInvalid = this.state.email === '' || this.state.password === ''
    return (
      <div className="login-form">
        <h1>Zaloguj</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="email" value={this.state.email} onChange={this.onEmailChange} placeholder="Email" />
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} placeholder="Hasło" />
          <button disabled={isInvalid} type="submit">Zaloguj</button>
        </form>
        <h3>Nie masz jeszcze konta? <Link to={'/konto'}>Zarejestruj się tutaj</Link></h3>
      </div>
    )
  }
}

export default Guest;
