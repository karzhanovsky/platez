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
        document.querySelector(".comments").innerHTML = "<h2>Brak komentarzy. Bądź pierwszy!</h2>";
      }
  })
}

  renderComments() {
    let sorted = Object.values(this.state.comments).reverse();
      return sorted.map(function(item) {
        return (
          <li key={item.timestamp}>
            {item.imageUrl && <a href={item.imageUrl} target="_blank">
              <img src={item.imageUrl} />
            </a>}
            <span>{item.author}</span>
            <p>{item.content}</p>
            <span>Likes</span>
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
          Ładowanie komentarzy...
        </h3>
        <img src='src/loading-transparent.gif' />
      </div>
    )
  }
}

export default RenderComments;
