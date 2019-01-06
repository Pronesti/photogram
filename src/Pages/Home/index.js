import React, { Component } from 'react';
import Post from '../../Components/Post';
import firebase from 'firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      redirect: false,
      posts: [],
      loading: true
    };
  }
  componentDidMount = () => {
    const _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        _this.fetchPosts();
        _this.setState({ logged: true });
      } else {
        // No user is signed in.
        _this.fetchPosts();
        _this.setState({ redirect: true });
      }
    });
  };

  listPosts() {
    if (this.state.posts) {
      return this.state.posts
        .reverse()
        .map((post, index) => (
          <Post
            author={post.author}
            authorpic={post.authorpic}
            img={post.img}
            epi={post.epi}
            key={index}
            date={post.date}
          />
        ));
    }
  }

  fetchPosts() {
    const that = this;
    let articles;
    var postRef = firebase.database().ref('posts/');
    postRef.on('value', function(snapshot) {
      let allposts = snapshot.val();
      try {
        articles = Object.entries(allposts).map(article => {
          return Object.assign({}, { id: article[0] }, article[1]);
        });
      } catch (err) {
        console.log(err);
      }
      that.setState({ loading: false });
      that.setState({ posts: articles });
    });

    return articles;
  }

  render() {
    return <div className='Home'>{this.listPosts()}</div>;
  }
}

export default Home;
