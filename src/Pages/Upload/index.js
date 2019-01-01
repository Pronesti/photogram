import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import firebase from 'firebase';


class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      fileContents: null,
    }
    this.handleFileSelected = this.handleFileSelected.bind(this);
  }

  handleFileSelected(event, file){
    this.setState({file: file, fileContents: event.target.result});
  };

  uploadFile(){
    // Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
   var uploadTask = firebase.storage().ref().child('images/' + this.state.file.name).put(this.state.file, metadata);

   // Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
function(snapshot) {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
}, function(error) {

  console.log(error);

}, function() {
// Upload completed successfully, now we can get the download URL
uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  console.log('File available at', downloadURL);
});
});
  }

  render() {
    return (
      <div className="Upload">
      <FileInput
      readAs='binary'
      multiple
     
     // onLoadStart={ this.showProgressBar }
      onLoad={ this.handleFileSelected }
     // onProgress={ this.updateProgressBar }
     
     // cancelIf={ checkIfFileIsIncorrectFiletype }
     // abortIf={ this.cancelButtonClicked }
     
     // onCancel={ this.showInvalidFileTypeMessage }
     // onAbort={ this.resetCancelButtonClicked }
     />
     
     <button className="btn btn-primary" onClick={() => this.uploadFile()}>UPLOAD</button>

      </div>
    );
  }
}

export default Upload;
