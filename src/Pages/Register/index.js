
import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import './Register.css';
import FileInput from 'react-simple-file-input';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: "",
            profileimg: "",
            email: "",
            password: "",
            redirect: false,
            file: null,
            fileContents: null,
            check: false,
        }

        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    async componentDidMount(){
        const _this = this;
      await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            _this.setState({redirect: true});
        } else {
          // No user is signed in.
          
        }
      });

    }
    

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  registerUser(){
    const that = this;
    const {email,password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
      console.log(that.state);
      that.database();
      return user.user.updateProfile({displayName: that.state.displayName, photoURL: that.state.profileimg});
    }).catch(function(error) {
      console.log(error);
    });
  }

  database(){
    const that = this;
    // A post entry.
  var userData = {
    displayName: that.state.displayName,
    photoURL: that.state.profileimg,
  };

  // Get a key for a new Post.
 firebase.database().ref().child('users').push(userData);
  }

  formatUser(user){
return user.replace("$", "").replace(".", "").replace("#", "").replace("[", "").replace("]", "").replace(".", "");
  }


  handleFileSelected(event, file){
    this.setState({file: file, fileContents: event.target.result});
    this.uploadFile();
  };


  uploadFile(){
    let _this = this;

    // Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
   var uploadTask = firebase.storage().ref().child('profileimg/' + this.state.displayName).put(this.state.file, metadata);

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
   default:
    break;
  }
}, function(error) {

  console.log(error);

}, function() {
// Upload completed successfully, now we can get the download URL
uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  console.log('File available at', downloadURL);
  _this.setState({profileimg: downloadURL,check: true});
});
});
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to='/profile/'/>;
      }
    if (this.state.toregister) {
        return <Redirect to='/register/'/>;
      }
    return (
      <div className="Register">
            {firebase.auth().currentUser ? (this.setState({redirect: true})) : (
            <div>
            


                <div className="card register-form">
  <div className="card-header">
    <div className="card-title h5">Registration</div>
    <div className="card-subtitle text-gray">...</div>
  </div>
  <div className="card-body">
  <form>
            <div className="form-group">
            <label className="form-label">Profile image</label>
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

            <label className="form-label">Name</label>
            <input name="displayName" className="form-input" type="text" placeholder="Name" onChange={(e) => this.handleChange(e)}/>
            </div>
            <div className="form-group">
                <label className="form-label">Email</label>
                <input name="email" className="form-input" type="text" placeholder="Email" autoComplete="email" onChange={(e) => this.handleChange(e)} />
                <label className="form-label">Password</label>
                <input name="password" className="form-input" type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => this.handleChange(e)} />           
            </div>
            </form>
  </div>
  <div className="card-footer">
  <button className="btn btn-block btn-primary" onClick={() => this.registerUser()} disabled={!this.state.check} >Sign In</button>
  </div>
</div>


            </div>
            )}
      </div>
    );
  }
}

export default Register;
