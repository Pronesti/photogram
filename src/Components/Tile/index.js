import React, { Component } from 'react';
import './Tile.css';
import { Link } from 'react-router-dom';

class Tile extends Component {
  render() {
    return (
      <div className='Tile'>
        <Link to={'/post/' + this.props.postkey}>
          <div className='gallery-item' tabIndex='0'>
            <img src={this.props.img} alt={this.props.author} />

            <div className='gallery-item-info'>
              <ul>
                <li className='gallery-item-likes'>
                  <span className='visually-hidden'>Likes:</span>
                  <i className='fas fa-heart' aria-hidden='true' /> 56
                </li>
                <li className='gallery-item-comments'>
                  <span className='visually-hidden'>Comments:</span>
                  <i className='fas fa-comment' aria-hidden='true' /> 2
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
export default Tile;
