import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value.toUpperCase()})
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.history.push('/plate/' + this.state.term)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="search-bar">
        <input type="text" value={this.state.term} onChange={this.onInputChange} placeholder="Search..." />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SearchBar;
