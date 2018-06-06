import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
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
    db.ref(`/plates/${plate}/comments`).limitToLast(10).on('value', snapshot => {
      if (snapshot.exists()) {
        this.setState({
          comments: snapshot.val()
        })
      } else {
        this.setState({
          comments: {123:{content: <span className="no-comments-span">Brak komentarzy. Bądź pierwszy!</span>, timestamp: new Date()}}
        })
      }
  })
}

  renderComments() {
    let sorted = Object.values(this.state.comments).reverse();
      return sorted.map(function(item) {
        return (
          <li key={item.timestamp}>
            <span>{item.author}</span>
            {item.imageUrl && <img src={item.imageUrl} />}
            {item.videoUrl && <video controls src={item.videoUrl} />}
            <p>{item.content}</p>
          </li>
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
      <div>
        <h3>
          Ładowanie...
        </h3>
        <img src='src/loading-transparent.gif' />
      </div>
    )
  }
}

export default RenderComments;
