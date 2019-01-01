import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import './Login.css';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            toregister: false,
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
   this.setState({toregister: true})
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to='/profile/'/>;
      }
    if (this.state.toregister) {
        return <Redirect to='/register/'/>;
      }
    return (
      <div className="User">
            {firebase.auth().currentUser ? (this.setState({redirect: true})) : (
            <div>

<div class="card login-form">
  <div class="card-header">
    <div class="card-title h5">Login</div>
    <div class="card-subtitle text-gray">...</div>
  </div>
  <div class="card-body">
  <form>
            <div className="form-group">
                <label className="form-label" for="input-example-1">Email</label>
                <input name="email" className="form-input" type="text" id="input-example-1" placeholder="Name" autoComplete="email" onChange={(e) => this.handleChange(e)} />
                <label className="form-label" for="input-example-1">Password</label>
                <input name="password" className="form-input" type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => this.handleChange(e)} />           
            </div>
            </form>
  </div>
  <div class="card-footer">
  <div className="btn-group btn-group-block">
                <button className="btn btn-primary" onClick={() => this.loginFunction()}>Log In</button>         
                </div>
            </div>
  </div>
</div>         
            )}


      </div>
    );
  }
}

export default User;
