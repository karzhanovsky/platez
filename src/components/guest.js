import React, { Component } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import CreateAccount from './create-account.js'

class Guest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      display: 'login',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.displayRegisterForm = this.displayRegisterForm.bind(this);
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

  displayRegisterForm() {
    this.setState({
      display: 'register',
    })
  }

  render() {
    let isInvalid = this.state.email === '' || this.state.password === ''
    if (this.props.register || this.state.display === 'register') {
      return (
        <CreateAccount />
      )
    } else {
    return (
      <div className="login-form">
        <h1>Zaloguj</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="email" value={this.state.email} onChange={this.onEmailChange} placeholder="Email" />
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} placeholder="Hasło" />
          <button disabled={isInvalid} type="submit">Zaloguj</button>
        </form>
        <div>
          <h3 className="register-button">Nie masz jeszcze konta? <button onClick={this.displayRegisterForm}>Zarejestruj się</button></h3>
          <h3 className="register-link">Nie masz jeszcze konta? <Link to={'/konto/zarejestruj'}>Zarejestruj się</Link></h3>
        </div>
      </div>
    )
  }
  }
}

export default Guest;
