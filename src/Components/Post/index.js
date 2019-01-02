import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './Post.css';
class Post extends Component {
 
  render() {
    return <article className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img src={this.props.authorpic} alt={this.props.author} />
            </div>
            <div className="Post-user-nickname">
              <span>{this.props.author}</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt="Icon Living" src={this.props.img} />
          </div>
        </div>
        <div className="Post-caption">
          <strong><Link to={'/user/' +this.props.author}>{this.props.author}</Link></strong> {this.props.epi}
        </div>
      </article>;
    }
}
export default Post;