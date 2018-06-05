import React, { Component } from 'react';
import firebase from 'firebase';
import { db } from '../firebase';
import _ from 'lodash';

class AddComment extends Component {
  constructor(props) {
  super(props);

  this.state = {
    plate: this.props.plate,
    term: '',
    imageUrl: '',
  }

  this.onFormSubmit = this.onFormSubmit.bind(this);
  this.onInputChange = this.onInputChange.bind(this);
  this.onImageAdded = this.onImageAdded.bind(this);
  this.removeThumbnail = this.removeThumbnail.bind(this);
}

  onFormSubmit(event) {
    event.preventDefault();
    db.ref(`/plates/${this.state.plate}/comments`).push({
      content: this.state.term,
      author: 'Anonymous',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      imageUrl: this.state.imageUrl,
    });
    this.setState({
      term: '',
      imageUrl: '',
    });
    let scrolledElement = document.querySelector('.comments');
    scrolledElement.scrollTop = 0;
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  onImageAdded() {
    let fileInputNode = document.querySelector("#file-upload");
    this.setState({
      imageUrl: 'src/loading.gif',
    })
    let that = this;
    if (fileInputNode.files.length > 0) {
      let uploadTask = firebase.storage().ref().child("images/" + new Date()).put(fileInputNode.files[0]);
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
        })
      })
    }
  }

  removeThumbnail() {
    document.querySelector("#file-upload").value = null;
    this.setState({
      imageUrl: '',
    })
  }

render() {
  return (
    <div className="add-comment">
      <form onSubmit={this.onFormSubmit}>
        {this.state.imageUrl && <div className="comment-image-thumnail" onClick={this.removeThumbnail}>
          <img src={this.state.imageUrl} />
        </div>}
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
