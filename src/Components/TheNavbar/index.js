import React, { Component } from 'react';
import './TheNavbar.css';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

class TheNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      logged: false,
    }
  }

  async componentDidMount(){
    const _this = this;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
          _this.setState({logged: true});
      } else {
        // No user is signed in.
        
      }
    });

  }
  
  render() {
    return (
      <div className="TheNavbar">
       <header className="navbar">
  <section className="navbar-section">
  <img src="https://cdn130.picsart.com/259430940027212.png" height="50px" width="50px" alt=""/>
  <h4 className="division"> | </h4>
  <Link to="/"><h4 className="title"> Photogram</h4></Link>
  </section>
  <section className="navbar-center">
  <div className="input-group input-inline">
      <input className="form-input" type="text" placeholder="search" />
    </div>
  </section>
  <section className="navbar-section">

  {this.state.logged ? (
  <div className="loggedLinks">
  <Link to="/profile/"><div className="btn btn-link">Profile</div></Link>
  <Link to="/upload/"><div className="btn btn-link">Upload</div></Link>
  </div> 
  ) : ( <Link to="/login/"><div className="btn btn-link">Login/Register</div></Link>)}
    
    <a href="http://www.github.com/Pronesti" className="btn btn-link">GitHub</a>
  </section>
</header>
      </div>
    );
  }
}

export default TheNavbar;
