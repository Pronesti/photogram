import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged: false,
            redirect: false,
        }
        
    }

    componentDidMount = () => {
        const _this = this;
        console.log(firebase.auth().currentUser);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log(user);
          _this.setState({logged: true});
        } else {
          // No user is signed in.
          _this.setState({redirect: true});
        }
      });
    }
    
  render() {
    if (this.state.redirect) {
        return <Redirect to='/login/'/>;
      }
    return (
      <div className="Profile">
        {firebase.auth().currentUser ? (<h1>{firebase.auth().currentUser.email}</h1>) : (<div className="loading loading-lg"></div>)}
        <button onClick={() => console.log(this.state)}> Click </button>
      </div>
    );
  }
}

export default Profile;
 