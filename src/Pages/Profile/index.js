import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';
import './Profile.css';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import Tile from '../../Components/Tile';


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged: false,
            redirect: false,
            posts: [],
            loading: true,
        }     
    }

    componentDidMount = () => {
        const _this = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         _this.fetchPosts();
          _this.setState({logged: true});
          console.log(firebase.auth().currentUser);

        } else {
          // No user is signed in.
          _this.setState({redirect: true});
        }
      });
    }

    fetchPosts(){
      const that = this;
      let articles;
      var postRef = firebase.database().ref('user-posts/' + 
          firebase.auth().currentUser.displayName);
           postRef.on('value', function(snapshot) {
              let allposts = snapshot.val();
              try{
                articles = Object.entries(allposts).map(article => {
                  return Object.assign({}, { id: article[0] }, article[1]);
                });
              }catch(error){
                console.log(error);
              }
           that.setState({loading: false})
           that.setState({posts: articles});
              });
         
          return articles;
    }
   

    listTiles(){
      if(this.state.posts)
      {
    return this.state.posts.reverse().map(post => 
    ( <Tile img={post.img} author={post.author} postkey={post.key} />
    ));
     }}
    
  render() {
    if (this.state.redirect) {
        return <Redirect to='/login/'/>;
      }
    return (
      <div className="Profile">
        {firebase.auth().currentUser ? (
         <div>{console.log(firebase.auth().currentUser)}
           <header>

<div className="container">

  <div className="profile">

    <div className="profile-image">

      <img className="fixprofilepic" src={firebase.auth().currentUser.photoURL} alt={firebase.auth().currentUser.displayName} />

    </div>

    <div className="profile-user-settings">

      <h1 className="profile-user-name">{firebase.auth().currentUser.displayName}</h1>

      {/*<button className="btn-profile profile-edit--profile">Edit Profile</button> */}

      <button className="btn-profile profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>

    </div>

    <div className="profile-stats">

      <ul>
        <li><span className="profile-stat-count">{this.state.posts ? this.state.posts.length : ("")}</span> posts</li>
        <li><span className="profile-stat-count">0</span> followers</li>
        <li><span className="profile-stat-count">0</span> following</li>
      </ul>

    </div>

    <div className="profile-bio">

      <p><span className="profile-real-name">{firebase.auth().currentUser.displayName}</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit <span role="img" >📷✈️🏕️</span></p>

    </div>

  </div>

</div>

</header>

<main>

<div className="container">

  <div className="gallery">

          {this.listTiles()}
    
  </div>

</div>

</main>
         </div>   




          
        ) : (<div className="loading loading-lg"></div>)}
      </div>
    );
  }
}

export default Profile;
 