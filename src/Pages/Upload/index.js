import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileContents: null,
      epi: '',
      redirect: false,
      redirectProfile: false,
      uploaded: false,
      progress: 0,
      url: ''
    };
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount = () => {
    const _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
        _this.setState({ redirect: true });
      }
    });
  };

  handleFileSelected(event, file) {
    this.setState({ file: file, fileContents: event.target.result });
    this.uploadFile();
  }

  uploadFile() {
    let that = this;

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
    var uploadTask = firebase
      .storage()
      .ref()
      .child('images/' + this.state.file.name)
      .put(this.state.file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        that.setState({ progress: progress });
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            //   console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            that.setState({ loading: true });
            // console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      function(error) {
        console.log(error);
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          // console.log('File available at', downloadURL);
          that.setState({ url: downloadURL, uploaded: true });
        });
      }
    );
  }

  createPost() {
    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('posts')
      .push().key;
    //GET TIMESTAMP
    const timestamp = moment().unix();
    // A post entry.
    var postData = {
      author: firebase.auth().currentUser.displayName,
      authorpic: firebase.auth().currentUser.photoURL,
      img: this.state.url,
      epi: this.state.epi,
      key: newPostKey,
      date: timestamp
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates[
      '/user-posts/' +
        firebase.auth().currentUser.displayName +
        '/' +
        newPostKey
    ] = postData;

    this.setState({ redirectProfile: true });
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  formatUser(user) {
    return user
      .replace('$', '')
      .replace('.', '')
      .replace('#', '')
      .replace('[', '')
      .replace(']', '')
      .replace('.', '');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/login/' />;
    }
    if (this.state.redirectProfile) {
      return <Redirect to='/profile/' />;
    }
    return (
      <div className='Upload'>
        <div className='empty'>
          <div className='empty-icon'>
            {this.state.uploaded ? (
              <h1>COMPLETED!</h1>
            ) : (
              <div>
                <p className='empty-title h5'>Select Image</p>
                <FileInput
                  readAs='binary'
                  multiple
                  // onLoadStart={ this.showProgressBar }
                  onLoad={this.handleFileSelected}
                  // onProgress={ this.updateProgressBar }

                  // cancelIf={ checkIfFileIsIncorrectFiletype }
                  // abortIf={ this.cancelButtonClicked }

                  // onCancel={ this.showInvalidFileTypeMessage }
                  // onAbort={ this.resetCancelButtonClicked }
                />
                <br />
                <br />
                <progress
                  className='progress'
                  value={this.state.progress}
                  max='100'
                />{' '}
              </div>
            )}
          </div>

          <p className='empty-subtitle'>Type your photo epigraph.</p>
          <input
            type='textarea'
            className='form-input'
            rows='2'
            name='epi'
            onChange={e => this.handleChange(e)}
          />
          <div className='empty-action'>
            <button
              className='btn btn-primary'
              onClick={() => this.createPost()}
              disabled={!this.state.uploaded}>
              UPLOAD
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
