import React, { Component } from 'react';
import { db } from '../firebase';
import firebase from 'firebase';

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plate: this.props.plate,
      term: '',
      image: '',
      imageUrl: '',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onImageAdded = this.onImageAdded.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.image !== '') {
      this.commentWithImage();
    } else {
      this.commentOnly();
    }
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  onImageAdded() {
    let inputNode = document.querySelector("#file-upload");
    if (inputNode.files.length > 0) {
      this.setState({
        image: inputNode.files[0],
      })
    }
  }

  commentWithImage() {
    let uploadTask = firebase.storage().ref().child("images/" + new Date()).put(this.state.image);
    var that = this;
    uploadTask.on('state_changed', function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error){
      console.log(error);
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL()
      .then(function(downloadURL) {
        that.setState({
          imageUrl: downloadURL,
        })
        db.ref(`/plates/${that.state.plate}/comments`).push({
          content: that.state.term,
          author: 'Anonymous',
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          imageUrl: that.state.imageUrl,
        });
        that.setState({
          term: '',
          image: '',
          imageUrl: '',
        });
        let scrolledElement = document.querySelector('.comments');
        scrolledElement.scrollTop = 0;
      })
    })
  }

  commentOnly() {
    db.ref(`/plates/${this.state.plate}/comments`).push({
      content: this.state.term,
      author: 'Anonymous',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({
      term: '',
      image: '',
    });
    let scrolledElement = document.querySelector('.comments');
    scrolledElement.scrollTop = 0;
  }

  render() {
    return (
      <div className="add-comment">
        <form onSubmit={this.onFormSubmit}>
          <textarea
          value={this.state.term}
          onChange={this.onInputChange}
          placeholder="Dodaj komentarz..."
          />
          <label className="file-upload-label">
            <input
            type="file"
            id="file-upload"
            onChange={this.onImageAdded}
            accept="image/*" />
          </label>
          <button type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default AddComment;
