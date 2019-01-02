import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';
import './Profile.css';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';


class ExProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged: false,
            redirect: false,
            posts: [0],
            loading: true,
            userInfo: {},
        }
        console.log(this.props.match.params);     
    }

    componentDidMount = () => {
        const _this = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         _this.fetchPosts();
         _this.fetchUserInfo();
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
         this.props.match.params.displayName);
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
           if(articles) that.setState({posts: articles});
              });
         
          return articles;
    }

    fetchUserInfo(){
      const that = this;
      var postRef = firebase.database().ref('users/');
           postRef.on('value', function(snapshot) {
               snapshot.forEach(function(child){
                 console.log(child.val().displayName);
                 if (child.val().displayName === that.props.match.params.displayName){
                   that.setState({userInfo: child.val()});
                   console.log(that.state)
                 }    
               });       
    });
    }
   

    listTiles(){
      if(this.state.posts)
      {
    return this.state.posts.reverse().map(post => 
    (<Link to={'/post/' + post.key}>
      <div className="gallery-item" tabIndex="0">

      <img src={post.img} className="gallery-image" alt={post.author} />

      <div className="gallery-item-info">

        <ul>
          <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
          <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
        </ul>

      </div>

    </div></Link>
    ));
     }}
    
  render() {
    if (this.state.redirect) {
        return <Redirect to='/login/'/>;
      }
    return (
      <div className="ExProfile">
        {firebase.auth().currentUser ? (
         <div>
           <header>

<div className="container">

  <div className="profile">

    <div className="profile-image">

      <img className="fixprofilepic" src={this.state.userInfo.photoURL} alt={this.state.userInfo.displayName} />

    </div>

    <div className="profile-user-settings">

      <h1 className="profile-user-name">{this.state.userInfo.displayName}</h1>

      {/*<button className="btn-profile profile-edit--profile">Edit Profile</button> */}

      <button className="btn-profile profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>

    </div>

    <div className="profile-stats">

      <ul>
        <li><span className="profile-stat-count">{this.state.posts.length}</span> posts</li>
        <li><span className="profile-stat-count">0</span> followers</li>
        <li><span className="profile-stat-count">0</span> following</li>
      </ul>

    </div>

    <div className="profile-bio">

      <p><span className="profile-real-name">{this.state.userInfo.displayName}</span>{" " + this.state.userInfo.description}</p>

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

export default ExProfile;
 