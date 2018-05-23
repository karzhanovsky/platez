import React, { Component } from 'react';
import { db } from '../firebase';

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
    db.ref(`/plates/${this.state.plate}/comments`).push(this.state.term);
    this.setState({term: ''});
  }
  onInputChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  render() {
    return (
      <div>
      Add a comment
        <form onSubmit={this.onFormSubmit}>
          <input type="text" value={this.state.term} onChange={this.onInputChange} placeholder="Comment" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddComment;
