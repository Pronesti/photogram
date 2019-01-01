import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import Post from '../../Components/Post';
import './Profile.css';

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
   

    listPosts(){
      if(this.state.posts)
      {
    return this.state.posts.map(post => 
    (<Post author={post.author} authorpic={post.authorpic} img={post.img} epi={post.epi}/>));
     }}
    
  render() {
    if (this.state.redirect) {
        return <Redirect to='/login/'/>;
      }
    return (
      <div className="Profile">
        {firebase.auth().currentUser ? (
          <div> 
                 <div className="panel">
  <div className="panel-header">
    <img className="profileIMG" src={firebase.auth().currentUser.photoURL} alt={firebase.auth().currentUser.displayName} />
    <div className="panel-title">{firebase.auth().currentUser.displayName}</div>
    <div className="panel-title">{firebase.auth().currentUser.email}</div>
  </div>
  <div className="panel-nav">
    {/*<!-- navigation components: tabs, breadcrumbs or pagination -->*/}
  </div>
  <div className="panel-body">
          {this.listPosts()}
  </div>
  <div className="panel-footer">
    {/*<!-- buttons or inputs -->*/}
  </div>
</div>
          </div>
        ) : (<div className="loading loading-lg"></div>)}
      </div>
    );
  }
}

export default Profile;
 