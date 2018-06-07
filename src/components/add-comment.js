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
    videoUrl: '',
  }

  this.onFormSubmit = this.onFormSubmit.bind(this);
  this.onInputChange = this.onInputChange.bind(this);
  this.handleFile = this.handleFile.bind(this);
  this.removeThumbnail = this.removeThumbnail.bind(this);
}

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term.length < 5) {
      alert("Komentarz musi mieć co najmniej 5 znaków.")
    } else {
    db.ref(`/plates/${this.state.plate}/comments`).push({
      content: this.state.term,
      author: 'Anonymous',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      imageUrl: this.state.imageUrl,
      videoUrl: this.state.videoUrl,
    });
    this.setState({
      term: '',
      imageUrl: '',
      videoUrl: '',
    });
    let scrolledElement = document.querySelector('.comments');
    scrolledElement.scrollTop = 0;
  }
}

  onInputChange(event) {
    this.setState({
      term: event.target.value
    })
  }

handleFile() {
  let file = document.querySelector("#image-upload").files[0];
  if (file.type == "image/jpeg" || file.type == "image/png") {
    this.setState({
      imageUrl: 'src/loading.gif',
    })
    this.handleImage(file);
  }
  else if(file.type == "video/mp4") {
    this.setState({
      videoUrl: 'src/loading.gif',
    })
    this.handleVideo(file);
  }
}

handleImage(file) {
  let that = this;
  let reader = new FileReader();
  reader.onload = function(readerEvent) {
    let image = new Image();
    image.onload = function(imageEvent) {
      let max_size = 600;
      let w = image.width;
      let h = image.height;
      if (w > h) {  if (w > max_size) { h*=max_size/w; w=max_size; }
      } else     {  if (h > max_size) { w*=max_size/h; h=max_size; } }
      let canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(image, 0, 0, w, h);
      if (file.type == "image/jpeg") {
        var dataURL = canvas.toDataURL("image/jpeg", 1.0);
        that.uploadToFirebase(dataURL, 'data_url');
      } else {
        var dataURL = canvas.toDataURL("image/png");
        that.uploadToFirebase(dataURL, 'data_url');
      }
    }
    image.src = readerEvent.target.result;
  }
  reader.readAsDataURL(file);
}

handleVideo(file) {
  let that = this;
  var reader = new FileReader();
  reader.onload = function(readerEvt) {
    var binaryString = readerEvt.target.result;
    let encodedVideo = btoa(binaryString);
    that.uploadToFirebase(encodedVideo, 'base64')
      };
    reader.readAsBinaryString(file);
}

uploadToFirebase(file, type) {
  let that = this;
  if (type == 'data_url') {
    let uploadTask = firebase.storage().ref().child("images/" + new Date()).putString(file, type);
    uploadTask.on('state_changed', function(snapshot) {}, function(error){}, function() {
      uploadTask.snapshot.ref.getDownloadURL()
      .then(function(downloadURL) {
        that.setState({
          imageUrl: downloadURL,
        })
      })
    })
  } else if (type == 'base64') {
    let uploadTask = firebase.storage().ref().child("videos/" + new Date()).putString(file, type);
    uploadTask.on('state_changed', function(snapshot) {}, function(error){}, function() {
      uploadTask.snapshot.ref.getDownloadURL()
      .then(function(downloadURL) {
        that.setState({
          videoUrl: downloadURL,
        })
      })
    })
  }
}

  removeThumbnail() {
    document.querySelector("#image-upload").value = null;
    this.setState({
      imageUrl: '',
      videoUrl: '',
    })
  }

render() {
  return (
    <div className="add-comment">
      <form onSubmit={this.onFormSubmit}>
        {this.state.imageUrl && <div className="comment-image-thumnail" onClick={this.removeThumbnail}>
          <img src={this.state.imageUrl} />
        </div>}
        {this.state.videoUrl == 'src/loading.gif' && <div className="comment-image-thumnail" onClick={this.removeThumbnail}>
          <img src={this.state.videoUrl} />
        </div>}
        {this.state.videoUrl && <div className="comment-image-thumnail" onClick={this.removeThumbnail}>
          <video src={this.state.videoUrl} />
        </div>}
        <textarea
        value={this.state.term}
        onChange={this.onInputChange}
        placeholder="Dodaj komentarz..."
        />
        <div className="add-comment-buttons">
          <label className="image-upload-label">
            <input
            type="file"
            id="image-upload"
            onChange={this.handleFile}
            accept="image/*" />
          </label>
          <label className="youtube-upload-label">
            <input
            type="file"
            id="youtube-upload"
            onChange={this.handleFile}
            accept="video/*" />
          </label>
          <label className="video-upload-label">
            <input
            type="file"
            id="video-upload"
            onChange={this.handleFile}
            accept="video/*" />
          </label>
        </div>
        <button type="submit"></button>
        <div style={{clear: "both"}}></div>
      </form>
    </div>
    )
  }
}

export default AddComment;
