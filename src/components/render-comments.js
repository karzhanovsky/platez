import React, { Component } from 'react';
import _ from 'lodash';
import { db } from '../firebase';

class RenderComments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: {},
    }
  }

  componentDidMount() {
    this.fetchComments(this.props.plate);
  }

  fetchComments(plate) {
    db.ref(`/plates/${plate}/comments`).limitToLast(3).on('value', snapshot => {
      if (snapshot.exists()) {
        this.setState({
          comments: snapshot.val()
        })
      }
  })
}

  renderComments() {
    let sorted = Object.values(this.state.comments).reverse();
      return sorted.map(function(item) {
        return (
          <li key={item.timestamp}><span>{item.author}</span><p>{item.content}</p><span>Likes</span></li>
        )
      })
  }

  render() {
    if (!_.isEmpty(this.state.comments)) {
      return (
        <ul>
          {this.renderComments()}
        </ul>
      )
    }
    return (
      <div>Ładowanie komentarzy...</div>
    )
  }
}

export default RenderComments;
