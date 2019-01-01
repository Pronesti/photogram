import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
        }
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

  loginFunction(){

    const _this = this;

      console.log(this.state);
    const {email,password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            _this.setState({redirect: true});
        } else {
          // No user is signed in.
          
        }
      });
  }

  signinFunction(){
    const {email,password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
  }
  render() {
    if (this.state.redirect) {
        return <Redirect to='/profile/'/>;
      }
    return (
      <div className="User">
            {firebase.auth().currentUser ? (this.setState({redirect: true})) : (
            <div>
            <form>
            <div className="form-group">
                <input name="email" className="form-input" type="text" id="input-example-1" placeholder="Name" autoComplete="email" onChange={(e) => this.handleChange(e)} />
                <input name="password" className="form-input" type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => this.handleChange(e)} />           
            </div>
            </form>
            <div className="btn-group btn-group-block">
                <button className="btn btn-primary" onClick={() => this.loginFunction()}>Log In</button>
                <button className="btn btn-secondary" onClick={() => this.signinFunction()}>Sign In</button>
                </div>
            </div>
            )}
      </div>
    );
  }
}

export default User;
