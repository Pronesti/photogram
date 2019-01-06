import React, { Component } from 'react';
import './Individual.css';
import firebase from 'firebase';
import Post from '../../Components/Post';
class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  componentDidMount = () => {
    this.fetchPosts();
  };

  fetchPosts() {
    const id = this.props.match.params.postid;
    const that = this;
    let articles;
    var postRef = firebase.database().ref('posts/' + id);
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
      that.setState({ post: allposts });
    });

    return articles;
  }

  listPosts() {
    if (this.state.post) {
      return (
        <Post
          author={this.state.post.author}
          authorpic={this.state.post.authorpic}
          img={this.state.post.img}
          epi={this.state.post.epi}
          date={this.state.post.date}
        />
      );
    } else {
      return '404 POST NOT FOUND';
    }
  }

  render() {
    return <div className='Home'>{this.listPosts()}</div>;
  }
}
export default Individual;
