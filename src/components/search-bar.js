import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      redirect: false
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  validateInput(input) {
    let output = input.replace(/[^a-zA-Z0-9]/, '')
    return output;
  }

  onInputChange(event) {
    this.setState({term: this.validateInput(event.target.value).toUpperCase()})
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.setState({redirect: true})
  }

  render() {

    if(this.state.redirect === true) {
      return <Redirect to={`/plate/${this.state.term}`} />
    }

    return (
      <div className="search-bar">
        <form onSubmit={this.onFormSubmit}>
          <input type="text" value={this.state.term} onChange={this.onInputChange} placeholder="Numer tablicy..." />{'\n'}
          <button className="btn btn-primary" type="submit">Szukaj</button>
        </form>
      </div>
    )
  }
}

export default SearchBar;
