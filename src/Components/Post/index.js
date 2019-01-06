import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import Moment from 'react-moment';
class Post extends Component {
  render() {
    return (
      <article className='Post' ref='Post'>
        <header>
          <div className='Post-user'>
            <div className='Post-user-avatar'>
              <Link to={'/user/' + this.props.author}>
                <img src={this.props.authorpic} alt={this.props.author} />
              </Link>
            </div>
            <div className='Post-user-nickname'>
              <Link to={'/user/' + this.props.author}>
                <span>{this.props.author}</span>
              </Link>
            </div>
            <div className='timestamp'>
              <Link to={'/post/' + this.props.postkey}>
                <Moment unix fromNow>
                  {this.props.date}
                </Moment>
              </Link>
            </div>
          </div>
        </header>
        <div className='Post-image'>
          <div className='Post-image-bg'>
            <img alt='Icon Living' src={this.props.img} />
          </div>
        </div>
        <div className='Post-caption'>
          <strong>
            <Link to={'/user/' + this.props.author}>{this.props.author}</Link>
          </strong>{' '}
          {this.props.epi}
        </div>
      </article>
    );
  }
}
export default Post;
