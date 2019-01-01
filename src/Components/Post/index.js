import React, { Component } from "react";
import './Post.css';
class Post extends Component {
  render() {
    return <article className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img src="http://meetthepopes.com/MP/wp-content/uploads/2017/02/Pope-Michael-1500x1500.jpg" alt="Chris" />
            </div>
            <div className="Post-user-nickname">
              <span>Chris</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt="Icon Living" src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
          </div>
        </div>
        <div className="Post-caption">
          <strong>Chris</strong> Moving the community!
        </div>
      </article>;
    }
}
export default Post;