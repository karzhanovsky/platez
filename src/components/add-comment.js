import React, { Component } from 'react';
import { db } from '../firebase';
import firebase from 'firebase';

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      plate: this.props.plate,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    db.ref(`/plates/${this.state.plate}/comments`).push({
      content: this.state.term,
      author: 'Anonymous',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({term: ''});
    let scrolledElement = document.querySelector('.comments');
    scrolledElement.scrollTop = 0;
  }
  onInputChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  render() {
    return (
      <div className="add-comment">
        <form onSubmit={this.onFormSubmit}>
          <textarea value={this.state.term} onChange={this.onInputChange} placeholder="Dodaj komentarz..." />
          <button type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default AddComment;
