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
  this.imageResize = this.imageResize.bind(this);
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
    });
    this.setState({
      term: '',
      imageUrl: '',
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

imageResize() {
  let file = document.querySelector("#file-upload").files[0];
  let that = this;
  if (file.type == "image/jpeg" || file.type == "image/png") {
    let reader = new FileReader();
    reader.onload = function(readerEvent) {
      let image = new Image();
      image.onload = function(imageEvent) {
        let max_size = 300;
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
        } else {
          var dataURL = canvas.toDataURL("image/png");
        }
        that.setState({
          imageUrl: dataURL,
        })
      }
      image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);
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
          onChange={this.imageResize}
          accept="image/*" />
        </label>
        <button type="submit">+</button>
      </form>
    </div>
    )
  }
}

export default AddComment;
