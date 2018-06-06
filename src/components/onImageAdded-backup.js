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
